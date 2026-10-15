import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import {
  claimLegacyEntries,
  GUESTBOOK_TAG,
} from "@/app/(pages)/guestbook/data";
import { getSessionUser } from "@/app/lib/auth/server";

// OAuth lands here after `proxy.ts` has exchanged the verifier for a session.
export async function GET(request: NextRequest) {
  const user = await getSessionUser();
  if (user && (await claimLegacyEntries(user)) > 0) {
    // The user is redirected straight to the guestbook: don't serve stale ownership.
    revalidateTag(GUESTBOOK_TAG, { expire: 0 });
  }
  return NextResponse.redirect(new URL("/guestbook", request.url));
}
