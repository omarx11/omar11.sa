import FormData from "../components/guestbook/FormData";
import GuestbookMessages from "../components/guestbook/GuestbookMessages";
import Heading from "../components/content/Heading";

export default function GuestbookPage() {
  return (
    <>
      <Heading name="Guestbook" emoji="🕮" target="#guestbook" />
      <p className="text-stone-400">
        Hey There!, please sign in and say hi. and Thanks for visiting my
        website 💚
      </p>
      <div className="w-full py-16">
        <FormData />
      </div>
      <GuestbookMessages />
    </>
  );
}
