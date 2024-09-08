import type { Metadata } from "next";
import { createClient } from "@/app/lib/supabase/server";
import FormData from "./components/FormData";
import OAuthButtons from "./login/OAuthButtons";
import { GuestbookMessages } from "./components/GuestbookMessages";
import { Heading } from "@/app/components/ui/Heading";
import { author } from "@/app/config/meta";

export const metadata: Metadata = {
  title: "Guestbook Page",
  description: `${author.name}'s Guestbook Comments`,
  keywords: [`${author.fullName} Guestbook`],
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

export default async function GuestbookPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Heading
        name="Guestbook"
        emoji="🖋️"
        sId="#guestbook"
        title="Hey There!, please sign in and say hi. and Thanks for visiting my website 💚"
      />
      <div className="flex w-full items-center justify-center">
        {user ? <FormData userData={user} /> : <OAuthButtons />}
      </div>
      <GuestbookMessages userData={user} />
    </>
  );
}
