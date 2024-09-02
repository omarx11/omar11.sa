import { Database } from "./supabase";

export type Guestbook = Database["public"]["Tables"]["gbook_omar11"]["Row"];
export type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
