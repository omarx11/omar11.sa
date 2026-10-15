// The production domain. Used for canonical URLs, the sitemap and structured
// data, so previews and local builds never advertise themselves as the site.
const SITE_URL = "https://omar11.sa";

export const author = {
  name: "Omar",
  fullName: "Omar Abdulaziz",
  jobTitle: "Web Developer",
  age: "10/12/1999",
  location: "Saudi Arabia / Buraydah",
  city: "Buraydah",
  country: "Saudi Arabia",
  siteName: "omar11.sa",
  siteUrl: SITE_URL,
  description:
    "Omar Abdulaziz is a self-taught web developer from Buraydah, Saudi Arabia, building fast, modern web apps with Next.js, React and TypeScript. Explore his projects, skills and experience.",
  github: "https://github.com/omarx11",
  twitter: "https://twitter.com/@dis_x0",
  twitterHandle: "@dis_x0",
  linkedIn: "https://www.linkedin.com/in/omar-abdulaziz-sa/",
  email: "mail@omar11.sa",
  discordId: "582305812903493663",
  steamId: "76561198965877925",
  avatar: "/static/images/avatar.png",
};

/** Public profiles that belong to the same person (schema.org `sameAs`). */
export const profiles = [
  author.github,
  "https://x.com/dis_x0",
  author.linkedIn,
];
