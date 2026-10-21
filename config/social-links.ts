import { author } from "@/config/meta";

type SocialLink = {
  url: string;
  icon: string;
  name: string;
};

export const socialLinks: SocialLink[] = [
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
    url: `https://discord.com/users/${author.discordId}`,
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
