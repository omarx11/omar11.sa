import { author } from "@/app/config/meta";
import FormData from "./FormData";
import GuestbookMessages from "./GuestbookMessages";
import { Heading } from "@/app/components/ui/Heading";

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

export default function GuestbookPage() {
  return (
    <>
      <Heading name="Guestbook" emoji="🕮" scrollTo="#guestbook" />
      <h2 className="text-neutral-400">
        Hey There!, please sign in and say hi. and Thanks for visiting my
        website 💚
      </h2>
      <div className="fade-in">
        <div className="flex w-full items-center justify-center">
          <FormData />
        </div>
        <GuestbookMessages />
      </div>
    </>
  );
}
