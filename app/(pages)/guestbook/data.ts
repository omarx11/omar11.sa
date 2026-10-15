import { cacheLife, cacheTag } from "next/cache";

import { sql } from "@/app/lib/db";

import type { GuestbookEntry } from "./types";

type GuestbookRow = {
  cid: string;
  user_id: string | null;
  name: string;
  avatar: string | null;
  comment: string;
  created_at: string | Date;
};

export function toEntry(row: Record<string, unknown>): GuestbookEntry {
  const r = row as GuestbookRow;
  return {
    cid: r.cid,
    userId: r.user_id,
    name: r.name,
    avatar: r.avatar,
    comment: r.comment,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

/** Cache tag for the public entry list; expire it after any write. */
export const GUESTBOOK_TAG = "guestbook";

export async function getEntries(): Promise<GuestbookEntry[]> {
  "use cache";
  // Entries only change through this app, which expires the tag on every
  // write, so views are served from cache instead of waking the database.
  cacheTag(GUESTBOOK_TAG);
  cacheLife("days");
  const rows = await sql`
    select cid, user_id, name, avatar, comment, created_at
    from guestbook
    order by created_at desc
  `;
  return rows.map(toEntry);
}

/**
 * Gives a signed-in user ownership of guestbook entries migrated from the old
 * database under the same email. Only verified emails can claim entries.
 */
export async function claimLegacyEntries(user: {
  id: string;
  email: string;
  emailVerified: boolean;
}) {
  if (!user.emailVerified) return 0;
  const claimed = await sql`
    update guestbook
    set user_id = ${user.id}, legacy_owner_email = null
    where user_id is null and legacy_owner_email = ${user.email.toLowerCase()}
    returning cid
  `;
  return claimed.length;
}
