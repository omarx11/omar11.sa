import { author } from "@/app/config/meta";

type MediaItemProps = {
  url: string;
  icon: string;
  name: string;
}[];

export const media: MediaItemProps = [
  {
    name: "Email",
    icon: "/static/icons/socials/email.svg",
    url: `mailto:${author.email}`,
  },
  {
    name: "Twitter X",
    icon: "/static/icons/socials/twitter-x.svg",
    url: author.twitter,
  },
  {
    name: "Discord",
    icon: "/static/icons/socials/discord.svg",
    url: `https://discordredirect.discordsafe.com/users/${author.discordId}`,
  },
  {
    name: "LinkedIn",
    icon: "/static/icons/socials/linkedin.svg",
    url: author.linkedIn,
  },
  {
    name: "Github",
    icon: "/static/icons/socials/github.svg",
    url: author.github,
  },
];
