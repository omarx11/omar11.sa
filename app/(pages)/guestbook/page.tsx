import { Heading } from "@/components/ui/Heading";
import { author } from "@/config/meta";
import { getSessionUser, toSessionUser } from "@/lib/auth/server";
import { simulateFirstVisit } from "@/lib/dev/first-visit";
import { pageMetadata } from "@/lib/metadata";

import { Guestbook } from "./components/Guestbook";
import { getEntries } from "./data";

export const metadata = pageMetadata({
  title: "Guestbook",
  description: `Sign ${author.fullName}'s guestbook with Google or GitHub and leave a message.`,
  path: "/guestbook",
});

export default function GuestbookPage() {
  return (
    <>
      <Heading
        anchor="guestbook"
        description="Hey there! Please sign in to say hi. Thanks for visiting my website 💚"
        emoji="🖋️"
        title="Guestbook"
      />
      {/* Entries are cached (`use cache`), so they're part of the static shell
          and need no loading state of their own. */}
      <div id="guestbook">
        <GuestbookData />
      </div>
    </>
  );
}

async function GuestbookData() {
  const entries = await getEntries();
  // Not awaited: the session reads cookies, so it's per request. Passed as a
  // promise, only the sign-in slot and the delete buttons wait for it, and
  // the cached entries stay in the static shell.
  return <Guestbook initialEntries={entries} userPromise={getUser()} />;
}

async function getUser() {
  await simulateFirstVisit();
  const sessionUser = await getSessionUser();
  return sessionUser ? toSessionUser(sessionUser) : null;
}
