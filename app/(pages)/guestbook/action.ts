"use server";

import { nanoid } from "nanoid";
import { createClient } from "@/app/lib/supabase/server";

export async function getAllComments() {
  const supabase = createClient();

  const { data: data, error } = await supabase
    .from("gbook_omar11")
    .select("*")
    .order("inserted_at", { ascending: false });

  if (error) {
    throw new Error(`Error fetching comments: ${error}`);
  }

  return data;
}

export async function saveComment(comment: string) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(`Authentication error: ${authError}`);
  }

  const newComment = {
    user_id: user!.id,
    cid: nanoid(),
    name: user!.user_metadata.name,
    comment,
    avatar: user!.user_metadata.avatar_url,
  };

  const { data, error } = await supabase
    .from("gbook_omar11")
    .insert(newComment)
    .select()
    .single();

  if (error) {
    throw new Error(`Error saving comment: ${error}`);
  }

  return data;
}

export async function deleteComment(cid: string) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(`Authentication error: ${authError}`);
  }

  const { error } = await supabase.from("gbook_omar11").delete().match({
    user_id: user!.id,
    cid: cid,
  });

  if (error) {
    throw new Error(`Error deleting comment: ${error}`);
  }
}
