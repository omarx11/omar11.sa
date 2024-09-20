"use server";

/**
 * GET Github Repository
 * @returns An array of comments.
 */
export const getGithubRepos = async () => {
  const response = await fetch(
    "https://api.github.com/users/omarx11/repos?direction=desc",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();

  return data;
};
