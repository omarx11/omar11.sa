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
    console.log(error);
  }

  return data;
}

export async function addComment(comment: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const body = {
    name: user.user_metadata.name,
    user_id: user.id,
    cid: nanoid(),
    comment: comment,
    avatar: user.user_metadata.avatar_url,
  };

  const { data, error } = await supabase
    .from("gbook_omar11")
    .insert(body)
    .select()
    .single();

  if (error) {
    console.log(error);
  }

  return data;
}

export async function deleteComment(cid: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("gbook_omar11").delete().match({
    user_id: user.id,
    cid: cid,
  });

  if (error) {
    console.log(error);
  }
}
