import axios from "axios";
import { PATHNAME_URL } from "@/app/lib/sitePath";

/**
 * GET my repository from github
 * @returns An array of repos.
 */
export async function getRepository() {
  try {
    const filteredRepos = [624386055, 386408964, 601036020];
    const res = await fetch(
      "https://api.github.com/users/omarx11/repos?sort=omarx11/chatin",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    const repos = await res.json();
    return repos.filter((d) => !filteredRepos.includes(d.id));
  } catch (err) {
    console.log(err);
  }
}

/**
 * Post guestbook messages
 * @param message The user message.
 * @returns An array of messages.
 */
export async function postMessages(message) {
  const { data } = await axios.post(`${PATHNAME_URL}/api/guestbook`, {
    data: {
      message: message,
    },
  });
  return data;
}

/**
 * Fetches guestbook messages
 * @returns An array of messages.
 */
export async function getMessages() {
  const { data } = await axios.get(`${PATHNAME_URL}/api/guestbook`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}
