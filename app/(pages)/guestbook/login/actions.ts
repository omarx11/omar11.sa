"use server";

import type { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { getURL } from "@/app/lib/helpers";
import { createClient } from "@/app/lib/supabase/server";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/guestbook");
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect("/error");
  }

  const supabase = await createClient();
  const redirectUrl = getURL("/auth/callback");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    throw new Error(`Could not authenticate user: ${error}`);
  }

  return redirect(data.url ?? "");
}
