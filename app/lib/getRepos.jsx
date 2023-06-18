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

export const getRepository = async () => {
  const filteredRepos = [386408964, 601036020];
  const res = await fetch("https://api.github.com/users/omarx11/repos", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  const repos = await res.json();
  // Promise await just for show cool loading animetion
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return repos
    .filter((d) => !filteredRepos.includes(d.id))
    .sort((a, b) => a.id - b.id);
};
