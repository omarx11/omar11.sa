"use server";

import { createClient } from "./server";
import { headers } from "next/headers";

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = await supabase.auth.signInWithPassword(data);

  return JSON.stringify(result);
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    password_confirm: formData.get("password_confirm") as string,
    options: {
      data: {
        full_name: formData.get("full_name") as string,
      },
    },
  };

  const result = await supabase.auth.signUp(data);

  return JSON.stringify(result);
}

export async function passwordReset(formData: FormData) {
  const supabase = createClient();
  const email = formData.get("email") as string;
  const origin = headers().get("origin");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/update-password`,
  });

  if (error) {
    return "Could not authenticate user. Try again!";
  }
}

export async function passwordUpdate(
  formData: FormData,
  searchParams: { code: string },
) {
  const supabase = createClient();
  const password = formData.get("password") as string;

  // TODO: ...
  // const { error } = await supabase.auth.exchangeCodeForSession(code);
  // if (!error) {
  //   // ..
  // }

  try {
    if (searchParams.code) {
      await supabase.auth.exchangeCodeForSession(searchParams.code);
    }
  } catch (error) {
    console.log(error);
    return "Unable to reset Password. Link expired!";
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return "Unable to reset Password. Try again!";
  }
}
