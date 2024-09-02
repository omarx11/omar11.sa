import { author } from "@/app/config/meta";
import OAuthButtons from "./login/OAuthButtons";
import FormData from "./components/FormData";
import { GuestbookMessages } from "./components/GuestbookMessages";
import { Heading } from "@/app/components/ui/Heading";
import { createClient } from "@/app/lib/supabase/server";

export const metadata = {
  title: "Guestbook Page",
  description: `Guestbook for ${author.description}`,
  keywords: [`${author.fullName} Guestbook`],
  openGraph: {
    title: "Guestbook Page",
    description: `Guestbook for ${author.description}`,
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
      <Heading name="Guestbook" emoji="🕮" scrollTo="#guestbook" />
      <h2 className="text-neutral-400">
        Hey There!, please sign in and say hi. and Thanks for visiting my
        website 💚
      </h2>
      <div className="fade-in">
        <div className="flex w-full items-center justify-center">
          {user ? <FormData user={user} /> : <OAuthButtons />}
        </div>
        <GuestbookMessages />
      </div>
    </>
  );
}
