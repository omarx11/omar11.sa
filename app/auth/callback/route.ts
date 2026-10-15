import { type NextRequest, NextResponse } from "next/server";

import { claimLegacyEntries } from "@/app/(pages)/guestbook/data";
import { getSessionUser } from "@/app/lib/auth/server";

// OAuth lands here after `proxy.ts` has exchanged the verifier for a session.
export async function GET(request: NextRequest) {
  const user = await getSessionUser();
  if (user) {
    await claimLegacyEntries(user);
  }
  return NextResponse.redirect(new URL("/guestbook", request.url));
}
