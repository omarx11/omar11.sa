// Everything personal about the site lives here, so a fork only has to edit
// this file (plus the content configs next to it).

// The production domain. Used for canonical URLs, the sitemap and structured
// data, so previews and local builds never advertise themselves as the site.
const SITE_URL = "https://omar11.sa";
const GITHUB_USERNAME = "omarx11";
const X_HANDLE = "dis_x0";

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
  /** Shown on the social share image. */
  stack: ["Next.js", "React", "TypeScript"],
  githubUsername: GITHUB_USERNAME,
  github: `https://github.com/${GITHUB_USERNAME}`,
  /** This website's source code. */
  sourceRepo: `https://github.com/${GITHUB_USERNAME}/omar11.sa`,
  twitter: `https://x.com/${X_HANDLE}`,
  twitterHandle: `@${X_HANDLE}`,
  linkedIn: "https://www.linkedin.com/in/omar-abdulaziz-sa/",
  email: "mail@omar11.sa",
  discordId: "582305812903493663",
  discordUsername: "omarx11",
  steamId: "76561198965877925",
  avatar: "/static/images/avatar.png",
  cv: "/static/files/omar_abdulaziz_cv_en.pdf",
  statusPage: "https://status.omar11.sa/",
};

/** Public profiles that belong to the same person (schema.org `sameAs`). */
export const profiles = [author.github, author.twitter, author.linkedIn];
