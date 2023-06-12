export const reposInfo = {
  imageMain: ["/steamid.png", "/chatin.png", "/omar11.jpg", "/pirateadv.png"],
  imageStyle: {
    position: "absolute",
    height: "100%",
    width: "100%",
    color: "transparent",
    padding: "12px",
    borderRadius: "1rem",
  },
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
    return "/icons/javascript.svg";
  } else if (repo === "HTML") {
    return "/icons/html.svg";
  } else if (repo === "CSS") {
    return "/icons/css.svg";
  } else {
    return "null";
  }
}

export const getRepository = async () => {
  try {
    const filteredRepos = [386408964, 601036020];
    const response = await fetch("https://api.github.com/users/omarx11/repos", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch data");
    const repos = await response.json();
    // added Promise await just for show cool loading animetion
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return repos
      .filter((d) => !filteredRepos.includes(d.id))
      .sort((a, b) => a.id - b.id);
  } catch (error) {
    console.log(error);
  }
};
