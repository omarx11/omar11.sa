import { Suspense } from "react";

import { Heading } from "@/app/components/ui/Heading";
import { Skeleton } from "@/app/components/ui/Skeleton";
import { getSessionUser, toSessionUser } from "@/app/lib/auth/server";
import { simulateFirstVisit } from "@/app/lib/dev/first-visit";
import { pageMetadata } from "@/app/lib/metadata";

import { Guestbook } from "./components/Guestbook";
import { getEntries } from "./data";

export const metadata = pageMetadata({
  title: "Guestbook",
  description:
    "Sign Omar Abdulaziz's guestbook with Google or GitHub and leave a message.",
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

const SKELETON_ROWS = ["a", "b", "c", "d", "e", "f"];

function GuestbookSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading guestbook" role="status">
      <div className="flex w-full justify-center">
        <Skeleton className="my-14 h-[136px] w-full max-w-xl rounded-md" />
      </div>
      <Skeleton className="-mt-2 h-10 w-full rounded-md" />
      <div className="mt-4 flex flex-col gap-1">
        {SKELETON_ROWS.map((key) => (
          <Skeleton className="h-[86px] w-full rounded-md" key={key} />
        ))}
      </div>
    </div>
  );
}
