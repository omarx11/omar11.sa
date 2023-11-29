import { author } from "@/app/configs/meta";
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
      <Heading name="Guestbook" emoji="🕮" target="#guestbook" />
      <h2 className="text-neutral-400">
        Hey There!, please sign in and say hi. and Thanks for visiting my
        website 💚
      </h2>
      <div className="w-full py-16">
        <FormData />
      </div>
      <GuestbookMessages />
    </>
  );
}
