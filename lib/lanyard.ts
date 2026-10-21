"use client";

import { useEffect, useState } from "react";

// The parts of a Lanyard presence (https://github.com/Phineas/lanyard) the
// site uses.
export type Activity = {
  id: string;
  /** 0 playing, 1 streaming, 2 listening, 3 watching, 4 custom, 5 competing. */
  type: number;
  name: string;
  details?: string;
  state?: string;
  application_id?: string;
  timestamps?: { start?: number; end?: number };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  emoji?: { name: string; id?: string; animated?: boolean };
};

export type Spotify = {
  song: string;
  artist: string | null;
  album: string | null;
  album_art_url: string | null;
  track_id: string | null;
  timestamps: { start: number; end: number };
};

export type Presence = {
  discord_status: "online" | "idle" | "dnd" | "offline";
  discord_user: {
    id: string;
    username: string;
    global_name: string | null;
    avatar: string | null;
  };
  activities: Activity[];
  listening_to_spotify: boolean;
  spotify: Spotify | null;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_web: boolean;
};

const SOCKET_URL = "wss://api.lanyard.rest/socket";
const RECONNECT_MS = 5000;

const firstPresence = new Map<string, Promise<Presence | null>>();

/**
 * Starts fetching a user's presence over plain HTTP, once. Call it as early as
 * possible (e.g. when a module loads): the request then runs while the page is
 * still starting up, and `useLanyard` picks up the result.
 */
export function preloadPresence(userId: string): Promise<Presence | null> {
  let request = firstPresence.get(userId);
  if (!request) {
    request = fetch(`https://api.lanyard.rest/v1/users/${userId}`)
      .then((res) => res.json())
      .then((body: { success: boolean; data?: Presence }) =>
        body.success && body.data ? body.data : null,
      )
      .catch(() => null);
    firstPresence.set(userId, request);
  }
  return request;
}

/**
 * A user's live Discord presence over Lanyard's WebSocket: it updates the
 * moment the status or activity changes (no polling). Undefined until the
 * first presence arrives; reconnects if the socket drops.
 */
export function useLanyard(userId: string): Presence | undefined {
  const [presence, setPresence] = useState<Presence>();

  useEffect(() => {
    let socket: WebSocket | undefined;
    let heartbeat: ReturnType<typeof setInterval> | undefined;
    let retry: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;
    // Set once the socket delivers, so a slower first request can't
    // overwrite newer data.
    let live = false;

    const connect = () => {
      socket = new WebSocket(SOCKET_URL);
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data as string);
        if (message.op === 1) {
          // Hello: keep the connection alive and subscribe.
          heartbeat = setInterval(
            () => socket?.send(JSON.stringify({ op: 3 })),
            message.d.heartbeat_interval,
          );
          socket?.send(
            JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }),
          );
        } else if (
          message.op === 0 &&
          (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE")
        ) {
          live = true;
          setPresence(message.d as Presence);
        }
      };
      socket.onclose = () => {
        clearInterval(heartbeat);
        if (!stopped) retry = setTimeout(connect, RECONNECT_MS);
      };
    };

    // The socket takes ~1 s to deliver the first presence (connect, hello,
    // subscribe); a plain request takes ~0.2 s, so it fills in the status
    // first. The socket then keeps it live.
    void preloadPresence(userId).then((first) => {
      if (first && !stopped && !live) setPresence(first);
    });

    connect();
    return () => {
      stopped = true;
      clearInterval(heartbeat);
      clearTimeout(retry);
      socket?.close();
    };
  }, [userId]);

  return presence;
}

/** An activity image key ("mp:external/…", "spotify:…" or an asset id) as a URL. */
export function assetUrl(
  activity: Activity,
  key: "large_image" | "small_image",
): string | null {
  const asset = activity.assets?.[key];
  if (!asset) return null;
  if (asset.startsWith("mp:external/")) {
    return `https://media.discordapp.net/external/${asset.slice("mp:external/".length)}`;
  }
  if (asset.startsWith("spotify:")) {
    return `https://i.scdn.co/image/${asset.slice("spotify:".length)}`;
  }
  if (asset.startsWith("mp:")) {
    return `https://media.discordapp.net/${asset.slice(3)}`;
  }
  return activity.application_id
    ? `https://cdn.discordapp.com/app-assets/${activity.application_id}/${asset}.png`
    : null;
}

/**
 * The activity's picture: its own art, or else its app's icon (games Discord
 * detects by itself often send no art), looked up by /api/discord/app-icon.
 */
export function activityIcon(activity: Activity): string | null {
  return (
    assetUrl(activity, "large_image") ??
    (activity.application_id
      ? `/api/discord/app-icon/${activity.application_id}`
      : null)
  );
}

export function emojiUrl(emoji: NonNullable<Activity["emoji"]>): string | null {
  return emoji.id
    ? `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}?size=32`
    : null;
}
