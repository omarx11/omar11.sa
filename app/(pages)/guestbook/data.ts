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

export async function getEntries(): Promise<GuestbookEntry[]> {
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
  if (!user.emailVerified) return;
  await sql`
    update guestbook
    set user_id = ${user.id}, legacy_owner_email = null
    where user_id is null and legacy_owner_email = ${user.email.toLowerCase()}
  `;
}
