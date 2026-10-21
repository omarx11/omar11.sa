"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Skeleton } from "@/components/ui/Skeleton";
import { author } from "@/config/meta";
import { useScramble } from "@/hooks/useScramble";
import { durationSince } from "@/lib/dates";
import {
  type Activity,
  activityIcon,
  assetUrl,
  emojiUrl,
  type Presence,
  preloadPresence,
  type Spotify,
  useLanyard,
} from "@/lib/lanyard";
import { cn } from "@/lib/utils";

// Start loading the status as soon as this code runs in the browser, before
// the page has finished starting up.
if (typeof window !== "undefined") void preloadPresence(author.discordId);

const STATUS_WORDS: Record<string, string> = {
  online: "online",
  idle: "away (idle)",
  dnd: "online but busy (do not disturb)",
  offline: "offline, probably asleep or away from his PC",
};

const CODE_EDITOR =
  /visual studio|vs ?code|cursor|zed|intellij|webstorm|sublime|vim/i;

/** What he's doing, as a heading: Discord reports an open editor as "Playing". */
function verb(activity: Activity): string {
  if (CODE_EDITOR.test(activity.name)) return "Coding in";
  return (
    { 1: "Streaming", 2: "Listening to", 3: "Watching", 5: "Competing in" }[
      activity.type
    ] ?? "Playing"
  );
}

/**
 * Omar's presence as a plain sentence for the chatbot prompt, e.g. "online,
 * coding in Visual Studio Code for 2 hours".
 */
function describePresence(presence: Presence): string {
  const status =
    STATUS_WORDS[presence.discord_status] ?? presence.discord_status;
  const activity = presence.activities.find((a) => a.type !== 4); // 4 = custom status
  const custom = presence.activities.find((a) => a.type === 4)?.state;
  let doing = "";
  if (presence.listening_to_spotify && presence.spotify) {
    doing = `listening to "${presence.spotify.song}" by ${presence.spotify.artist} on Spotify`;
  } else if (activity) {
    const since = activity.timestamps?.start
      ? ` ${durationSince(new Date(activity.timestamps.start))}`
      : "";
    doing = `${verb(activity).toLowerCase()} ${activity.name}${since}`;
  } else if (presence.discord_status !== "offline") {
    doing = "on his PC, not doing anything in particular";
  }
  const parts = [status, doing, custom && `his status says "${custom}"`];
  // Cookie values can't hold ";" or line breaks.
  return parts
    .filter(Boolean)
    .join(", ")
    .replace(/[;\r\n]/g, " ");
}

export default function DiscordStatus() {
  // Live over a WebSocket; undefined until the first presence arrives.
  const presence = useLanyard(author.discordId);
  const [open, setOpen] = useState(false);
  // Hover cards ignore touch, so a tap toggles the card instead.
  const pointerType = useRef("mouse");
  const triggerRef = useRef<HTMLButtonElement>(null);

  // The chatbot prompt reads this cookie on the server to answer status questions.
  const onlineState = presence ? describePresence(presence) : null;

  useEffect(() => {
    if (onlineState) {
      window.cookieStore?.set("onlineState", onlineState).catch(() => {});
    }
  }, [onlineState]);

  if (!presence) {
    return (
      <Skeleton className="my-0.5 h-5 w-40 rounded-xs bg-neutral-800/75" />
    );
  }

  const statusText =
    presence.discord_status === "dnd"
      ? "online. (do not disturb)"
      : `${presence.discord_status}.`;
  const custom = presence.activities.find((a) => a.type === 4);
  const spotify = presence.listening_to_spotify ? presence.spotify : null;
  // Spotify has its own section, from richer data than its activity entry.
  const activities = presence.activities.filter(
    (a) => a.type !== 4 && !(spotify && a.name === "Spotify"),
  );
  const current = activities[0];
  const inline = current
    ? {
        icon: activityIcon(current),
        label: current.name,
        title: `${verb(current)} ${current.name}`,
      }
    : spotify
      ? {
          icon: spotify.album_art_url,
          label: spotify.song,
          title: `Listening to ${spotify.song}`,
        }
      : null;

  return (
    <HoverCard closeDelay={0} onOpenChange={setOpen} open={open} openDelay={0}>
      <HoverCardTrigger asChild>
        <button
          aria-expanded={open}
          className="flex items-center gap-2 pl-px text-left select-none"
          onClick={() => {
            if (pointerType.current === "touch") setOpen((wasOpen) => !wasOpen);
          }}
          onPointerDown={(e) => {
            pointerType.current = e.pointerType;
          }}
          ref={triggerRef}
          type="button"
        >
          <StatusDot status={presence.discord_status} />
          <p className="whitespace-nowrap">
            currently <Decoded text={statusText} />
          </p>
          {inline && presence.discord_status !== "offline" && (
            <span
              className="flex max-w-60 min-w-0 items-center gap-1.5 rounded-sm bg-neutral-900 py-0.5 pr-1.5 pl-0.5 text-xs text-neutral-400"
              // A new activity remounts it, so its name decodes again.
              key={inline.label}
              title={inline.title}
            >
              <ActivityImage className="size-4 rounded-xs" src={inline.icon} />
              <span className="hidden truncate sm:inline">
                <Decoded text={inline.label} />
              </span>
            </span>
          )}
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        className="z-40 w-80 rounded-md border-4 border-dashed border-emerald-600/40 bg-zinc-800 p-2.5 text-sm"
        collisionPadding={12}
        // A click on the status itself isn't "outside": it keeps the card
        // open (and on touch screens its own tap toggles it).
        onPointerDownOutside={(e) => {
          if (triggerRef.current?.contains(e.target as Node))
            e.preventDefault();
        }}
        sideOffset={0}
      >
        {custom && (custom.state || custom.emoji) && (
          <CustomStatus activity={custom} />
        )}
        {presence.discord_status === "offline" ? (
          <p className="border-zinc-700/70 not-first:mt-2.5 not-first:border-t not-first:pt-2">
            Maybe {`he's`} sleeping💤 or outside🚪
          </p>
        ) : activities.length === 0 && !spotify ? (
          <p className="border-zinc-700/70 not-first:mt-2.5 not-first:border-t not-first:pt-2">
            On his desktop. not doing anything! 📡🛰️
          </p>
        ) : (
          <>
            {activities.map((activity) => (
              <ActivityRow activity={activity} key={activity.id} />
            ))}
            {spotify && <SpotifyRow spotify={spotify} />}
          </>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}

/** Text that decodes from glyphs when it appears or changes. */
function Decoded({ text }: { text: string }) {
  const shown = useScramble(text);
  return (
    <>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{text}</span>
    </>
  );
}

function StatusDot({
  status,
  className,
}: {
  status: Presence["discord_status"];
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative mx-0.5 h-3 w-3 shrink-0 rounded-full",
        {
          "ping-online border-red-300 bg-[#1db954]": status === "online",
          "ping-idle border-yellow-300 bg-yellow-400": status === "idle",
          "ping-offline border-[3px] border-neutral-300 bg-transparent":
            status === "offline",
          "ping-dnd border-rose-300 bg-rose-400": status === "dnd",
        },
        className,
      )}
    />
  );
}

/** His custom status (emoji and text), when he has set one. */
function CustomStatus({ activity }: { activity: Activity }) {
  const emoji = activity.emoji;
  const emojiSrc = emoji && emojiUrl(emoji);
  return (
    <p className="flex items-center gap-1 rounded-sm bg-zinc-900/60 px-2 py-1 text-xs text-neutral-300">
      {emoji &&
        (emojiSrc ? (
          <Image
            alt={emoji.name}
            className="size-4"
            height={16}
            src={emojiSrc}
            unoptimized
            width={16}
          />
        ) : (
          <span>{emoji.name}</span>
        ))}
      <span className="truncate">{activity.state}</span>
    </p>
  );
}

function ActivityRow({ activity }: { activity: Activity }) {
  const small = assetUrl(activity, "small_image");
  const start = activity.timestamps?.start;

  return (
    <section className="border-zinc-700/70 not-first:mt-2.5 not-first:border-t not-first:pt-2">
      <h5 className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
        {verb(activity)}
      </h5>
      <div className="mt-1.5 flex gap-2.5">
        <div className="relative size-14 shrink-0">
          <ActivityImage
            className="size-14 rounded-md"
            src={activityIcon(activity)}
            title={activity.assets?.large_text}
          />
          {small && (
            <ActivityImage
              className="absolute -right-1 -bottom-1 size-5 rounded-full ring-2 ring-zinc-800"
              src={small}
              title={activity.assets?.small_text}
            />
          )}
        </div>
        <div className="min-w-0 text-xs leading-snug">
          <p className="truncate text-sm font-semibold text-neutral-100">
            {activity.name}
          </p>
          {activity.details && (
            <p className="truncate text-neutral-300">{activity.details}</p>
          )}
          {activity.state && (
            <p className="truncate text-neutral-400">{activity.state}</p>
          )}
          {start && <Elapsed start={start} />}
        </div>
      </div>
    </section>
  );
}

function SpotifyRow({ spotify }: { spotify: Spotify }) {
  const now = useNow();
  const { start, end } = spotify.timestamps;
  const progress = Math.min(1, Math.max(0, (now - start) / (end - start)));

  return (
    <section className="border-zinc-700/70 not-first:mt-2.5 not-first:border-t not-first:pt-2">
      <h5 className="text-[10px] font-bold tracking-wider text-[#1db954] uppercase">
        Listening to Spotify
      </h5>
      <div className="mt-1.5 flex gap-2.5">
        <ActivityImage
          className="size-14 shrink-0 rounded-md"
          src={spotify.album_art_url}
          title={spotify.album ?? undefined}
        />
        <div className="min-w-0 flex-1 text-xs leading-snug">
          {spotify.track_id ? (
            <a
              className="block truncate text-sm font-semibold text-neutral-100 hover:underline"
              href={`https://open.spotify.com/track/${spotify.track_id}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {spotify.song}
            </a>
          ) : (
            <p className="truncate text-sm font-semibold text-neutral-100">
              {spotify.song}
            </p>
          )}
          {spotify.artist && (
            <p className="truncate text-neutral-300">by {spotify.artist}</p>
          )}
          {spotify.album && (
            <p className="truncate text-neutral-400">on {spotify.album}</p>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-neutral-400">
        <span>{clock(now - start)}</span>
        <span className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-700">
          <span
            className="block h-full rounded-full bg-[#1db954] transition-[width] duration-1000 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </span>
        <span>{clock(end - start)}</span>
      </div>
    </section>
  );
}

/** "01:23:45 elapsed", ticking every second while the card is open. */
function Elapsed({ start }: { start: number }) {
  const now = useNow();
  return (
    <p className="mt-0.5 font-mono text-[11px] text-emerald-400">
      {clock(now - start)} elapsed
    </p>
  );
}

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now;
}

/** 83000 → "01:23"; an hour or more → "01:23:45". */
function clock(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

/** An activity picture, with a controller icon when there's none or it fails. */
function ActivityImage({
  src,
  className,
  title,
}: {
  src: string | null;
  className: string;
  title?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <span
        className={cn(
          "grid place-items-center bg-zinc-700 text-neutral-400",
          className,
        )}
        title={title}
      >
        <svg
          aria-hidden="true"
          className="size-3/5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7.97 16 5 19c-.36.36-.85.56-1.36.56A2 2 0 0 1 1.64 17.5L2.7 9.83A5 5 0 0 1 7.64 6h8.72a5 5 0 0 1 4.94 3.83l1.06 7.67A2 2 0 0 1 20.36 19.56c-.51 0-1-.2-1.36-.56l-2.97-3H7.97ZM8 9v2H6v1h2v2h1v-2h2v-1H9V9H8Zm7.5 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm2 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
        </svg>
      </span>
    );
  }
  return (
    <Image
      alt=""
      className={cn("bg-zinc-700 object-cover", className)}
      height={56}
      onError={() => setFailedSrc(src)}
      src={src}
      title={title}
      unoptimized
      width={56}
    />
  );
}
