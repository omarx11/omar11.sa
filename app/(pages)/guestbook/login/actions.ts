"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/app/lib/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { getURL } from "@/app/lib/helpers";

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/guestbook");
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    console.log("No provider selected");
    return redirect("/error");
  }

  const supabase = createClient();
  const redirectUrl = getURL("/auth/callback");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    console.log("Could not authenticate user");
  }

  return redirect(data.url);
}
