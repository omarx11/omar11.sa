import { author } from "@/app/config/meta";

export const media = [
  {
    url: `mailto:${author.email}`,
    icon: "/static/icons/email.svg",
    alt: "email-icon",
  },
  {
    url: author.twitter,
    icon: "/static/icons/twitter-x.svg",
    alt: "twitter-x-icon",
  },
  {
    url: `https://discordredirect.discordsafe.com/users/${author.discordId}`,
    icon: "/static/icons/discord.svg",
    alt: "discord-icon",
  },
  {
    url: author.github,
    icon: "/static/icons/github.svg",
    alt: "github-icon",
  },
];
