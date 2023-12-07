import { author } from "@/app/config/meta";

export const media = [
  {
    url: `mailto:${author.email}`,
    icon: "/static/icons/socials/email.svg",
    name: "Email",
  },
  {
    url: author.twitter,
    icon: "/static/icons/socials/twitter-x.svg",
    name: "Twitter X",
  },
  {
    url: `https://discordredirect.discordsafe.com/users/${author.discordId}`,
    icon: "/static/icons/socials/discord.svg",
    name: "Discord",
  },
  {
    url: author.linkedIn,
    icon: "/static/icons/socials/linkedin.svg",
    name: "LinkedIn",
  },
  {
    url: author.github,
    icon: "/static/icons/socials/github.svg",
    name: "Github",
  },
];
