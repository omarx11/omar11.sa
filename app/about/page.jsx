import { author } from "@/app/config/meta";

export const metadata = {
  title: "About",
  description: `About ${author.fullName}`,
  keywords: [`About ${author.fullName}`],
  openGraph: {
    title: "About",
    description: author.description,
    url: `${author.siteUrl}/about`,
    images: [
      {
        url: author.ogImage,
      },
    ],
    type: "website",
  },
};

export default function AboutPage() {
  return (
    // <div>
    //   {/* my desktop image + more about me + contact + resume
    //   + pc parts */}
    //   <h1>About page, nothing here yet!</h1>
    // </div>
    <div className="my-32 flex items-center justify-center text-center ">
      <h2 className="text-xl font-semibold opacity-30 dark:text-white">
        This page is currently under construction...
        <br />
        Come back and check again later.
      </h2>
    </div>
  );
}
