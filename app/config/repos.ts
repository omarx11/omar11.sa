export type Repository = {
  id: number;
  name: string;
  description: string;
  homepage?: string;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
};

export type RepoInfo = {
  image: string;
  isUnderDev: boolean;
  lang: string[];
};

export type ReposInfo = {
  [key: string]: RepoInfo;
};

export const manualRepository: Repository[] = [
  {
    id: 1,
    homepage: "https://old.omar11.sa/",
    name: "my-old-website",
    stargazers_count: 0,
    forks_count: 0,
    watchers_count: 0,
    description:
      "My old website, created for self-learning such as HTML, CSS, JavasSript, PHP, API's, and more..",
  },
];

export const reposInfo: ReposInfo = {
  "steamid.info": {
    image: "/static/images/projects/steamid.png",
    lang: [
      "/static/icons/tech/javascript.svg",
      "/static/icons/tech/nodejs.svg",
      "/static/icons/tech/mongo.svg",
      "/static/icons/tech/auth.svg",
      "/static/icons/tech/ejs.svg",
    ],
    isUnderDev: false,
  },
  "steam-screenshots-api": {
    image: "/static/images/projects/steam-screenshots-api.png",
    lang: ["/static/icons/tech/nodejs.svg"],
    isUnderDev: false,
  },
  "omar11.sa": {
    image: "/static/images/projects/portfolio.png",
    lang: [
      "/static/icons/tech/nextjs.svg",
      "/static/icons/tech/tailwindcss.svg",
      "/static/icons/tech/sass.svg",
      "/static/icons/tech/supabase.svg",
      "/static/icons/tech/auth.svg",
    ],
    isUnderDev: true,
  },
  "guestbook-demo": {
    image: "/static/images/projects/guestbook.png",
    lang: [
      "/static/icons/tech/nextjs.svg",
      "/static/icons/tech/tailwindcss.svg",
      "/static/icons/tech/supabase.svg",
      "/static/icons/tech/auth.svg",
    ],
    isUnderDev: true,
  },
  "chatin-v2": {
    image: "/static/images/projects/chatin2.png",
    lang: [
      "/static/icons/tech/nextjs.svg",
      "/static/icons/tech/supabase.svg",
      "/static/icons/tech/tailwindcss.svg",
    ],
    isUnderDev: true,
  },
  "my-old-website": {
    image: "/static/images/projects/old-web.png",
    lang: [
      "/static/icons/tech/javascript.svg",
      "/static/icons/tech/php.svg",
      "/static/icons/tech/mysql.svg",
    ],
    isUnderDev: false,
  },
};
