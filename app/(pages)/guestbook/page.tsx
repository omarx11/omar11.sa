import type { Metadata } from "next";
import { Heading } from "@/app/components/ui/Heading";
import { author } from "@/app/config/meta";
import { createClient } from "@/app/lib/supabase/server";
import FormData from "./components/FormData";
import { GuestbookMessages } from "./components/GuestbookMessages";
import OAuthButtons from "./login/OAuthButtons";

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

export default async function GuestbookPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Heading
        name="Guestbook"
        emoji="🖋️"
        sId="#guestbook"
        title="Hey there! Please sign in to say hi. Thanks for visiting my website 💚"
      />
      <div className="flex w-full items-center justify-center">
        {user ? <FormData userData={user} /> : <OAuthButtons />}
      </div>
      <GuestbookMessages userData={user} />
    </>
  );
}
