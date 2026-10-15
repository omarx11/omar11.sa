"use server";

import { nanoid } from "nanoid";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth, getSessionUser } from "@/app/lib/auth/server";
import { sql } from "@/app/lib/db";

import { GUESTBOOK_TAG, toEntry } from "./data";
import type { GuestbookEntry } from "./types";

const CommentSchema = z.string().trim().min(1).max(2000);
const CidSchema = z.string().min(1).max(64);

async function requireUser() {
  const user = await getSessionUser();
  if (!user) throw new Error("You must be signed in.");
  return user;
}

export async function saveComment(comment: string): Promise<GuestbookEntry> {
  const user = await requireUser();
  const text = CommentSchema.parse(comment);

  const [row] = await sql`
    insert into guestbook (cid, user_id, name, avatar, comment)
    values (${nanoid()}, ${user.id}, ${user.name}, ${user.image ?? null}, ${text})
    returning cid, user_id, name, avatar, comment, created_at
  `;
  updateTag(GUESTBOOK_TAG);
  return toEntry(row);
}

export async function deleteComment(cid: string): Promise<void> {
  const user = await requireUser();
  const id = CidSchema.parse(cid);

  const deleted = await sql`
    delete from guestbook
    where cid = ${id} and user_id = ${user.id}
    returning cid
  `;
  if (deleted.length === 0) {
    throw new Error("Entry not found, or it belongs to someone else.");
  }
  updateTag(GUESTBOOK_TAG);
}

export async function signOut() {
  await auth.signOut();
  redirect("/guestbook");
}
