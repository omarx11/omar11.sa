export const reposInfo = {
  imageMain: [
    "/static/images/steamid.png",
    "/static/images/chatin.png",
    "/static/images/omar11.jpg",
    "/static/images/pirateadv.png",
  ],
};

export const manualRepository = [
  {
    id: 1,
    homepage: "https://pirateadv.me",
    name: "my-old-website",
    language: "JavaScript",
    stargazers_count: "-",
    forks_count: "-",
    watchers_count: "-",
    description:
      "My old and first website, created for self-learning such as php, javascript, APIs, and more...",
  },
];

export function setRepoLanguageIcon(repo) {
  if (repo === "JavaScript") {
    return "/static/icons/javascript.svg";
  } else if (repo === "HTML") {
    return "/static/icons/html.svg";
  } else if (repo === "CSS") {
    return "/static/icons/css.svg";
  } else return "";
}
