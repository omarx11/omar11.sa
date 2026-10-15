import { createNeonAuth } from "@neondatabase/auth/next/server";
import { cookies } from "next/headers";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set.`);
  return value;
}

export const auth = createNeonAuth({
  baseUrl: requireEnv("NEON_AUTH_BASE_URL"),
  cookies: { secret: requireEnv("NEON_AUTH_COOKIE_SECRET") },
});

// Set by Neon Auth only while a user is signed in.
const SESSION_COOKIE = "__Secure-neon-auth.session_token";

/** The signed-in user's public profile, safe to pass to client components. */
export type SessionUser = {
  id: string;
  name: string;
  image: string | null;
};

export async function getSessionUser() {
  // Anonymous visitors have no session cookie: skip the Neon Auth round trip.
  if (!(await cookies()).has(SESSION_COOKIE)) return null;
  const { data } = await auth.getSession();
  return data?.user ?? null;
}

export function toSessionUser(user: {
  id: string;
  name: string;
  image?: string | null;
}): SessionUser {
  return { id: user.id, name: user.name, image: user.image ?? null };
}
