import { auth } from "@/lib/auth/server";

// Completes OAuth sign-in: exchanges the verifier Neon Auth appends to the
// callback URL for a session cookie. `/auth/callback` is on Neon Auth's
// default allow-list, so this never redirects visitors to a login page.
export default auth.middleware();

export const config = {
  matcher: ["/auth/callback"],
};
