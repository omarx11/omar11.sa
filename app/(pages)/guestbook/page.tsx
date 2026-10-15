import { Suspense } from "react";

import { Heading } from "@/app/components/ui/Heading";
import { author } from "@/app/config/meta";
import { getSessionUser, toSessionUser } from "@/app/lib/auth/server";
import { simulateFirstVisit } from "@/app/lib/dev/first-visit";
import { pageMetadata } from "@/app/lib/metadata";

import { Guestbook } from "./components/Guestbook";
import GuestbookSkeleton from "./components/GuestbookSkeleton";
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
        emoji="🖋️"
        name="Guestbook"
        sId="#guestbook"
        title="Hey there! Please sign in to say hi. Thanks for visiting my website 💚"
      />
      <Suspense fallback={<GuestbookSkeleton />}>
        <GuestbookData />
      </Suspense>
    </>
  );
}

async function GuestbookData() {
  await simulateFirstVisit();
  const [sessionUser, entries] = await Promise.all([
    getSessionUser(),
    getEntries(),
  ]);
  return (
    <Guestbook
      initialEntries={entries}
      user={sessionUser ? toSessionUser(sessionUser) : null}
    />
  );
}
