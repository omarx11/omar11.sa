import config from "@/app/data/config";

export const metadata = {
  title: "About",
  description: `About ${config.authorFull}`,
  keywords: [`About ${config.authorFull}`],
  openGraph: {
    title: "About",
    description: config.description,
    url: `${config.siteUrl}/about`,
    images: [
      {
        url: config.ogImage,
      },
    ],
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* my desktop image + more about me + contact + resume
      + pc parts */}
      <h1>About page, nothing here yet!</h1>
    </div>
  );
}
