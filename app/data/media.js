import { config } from "@/app/data/config";

export const mediaInfo = [
  {
    href: `mailto:${config.email}`,
    src: "/static/icons/email.svg",
    alt: "email-icon",
  },
  {
    href: config.twitter,
    src: "/static/icons/twitter.svg",
    alt: "twitter-icon",
  },
  {
    href: `https://discordredirect.discordsafe.com/users/${config.discordId}`,
    src: "/static/icons/discord.svg",
    alt: "discord-icon",
  },
  {
    href: config.github,
    src: "/static/icons/github.svg",
    alt: "github-icon",
  },
];
