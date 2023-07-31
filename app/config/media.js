import { author } from "@/app/config/meta";

export const mediaInfo = [
  {
    href: `mailto:${author.email}`,
    src: "/static/icons/email.svg",
    alt: "email-icon",
  },
  {
    href: author.twitter,
    src: "/static/icons/twitter.svg",
    alt: "twitter-icon",
  },
  {
    href: `https://discordredirect.discordsafe.com/users/${author.discordId}`,
    src: "/static/icons/discord.svg",
    alt: "discord-icon",
  },
  {
    href: author.github,
    src: "/static/icons/github.svg",
    alt: "github-icon",
  },
];
