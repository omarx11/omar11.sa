import type { Metadata } from "next";
import { Suspense } from "react";

import { Heading } from "@/app/components/ui/Heading";
import { Skeleton } from "@/app/components/ui/Skeleton";
import { author } from "@/app/config/meta";
import { getSessionUser, toSessionUser } from "@/app/lib/auth/server";

import { Guestbook } from "./components/Guestbook";
import { getEntries } from "./data";

export const metadata: Metadata = {
  title: "Guestbook Page",
  description: `${author.name}'s Guestbook Comments`,
  keywords: ["Guestbook", "Comments", "Sign Guestbook", author.fullName],
  openGraph: {
    title: "Guestbook Page",
    description: `${author.name}'s Guestbook Comments`,
    url: `${author.siteUrl}/guestbook`,
    images: [
      {
        url: author.ogImage,
      },
    ],
    type: "website",
  },
};

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
