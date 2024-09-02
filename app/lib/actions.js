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
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();

  return data;
};

/**
 * POST Bot Message
 * @param botMessages Array of messages.
 * @returns An object of the bot message.
 */
export const getBotMessage = async ({ botMessages }) => {
  const data = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ botMessages }),
  });
  if (!data.ok) throw new Error("Failed to fetch data");

  return data;
};

/**
 * POST Bot Messages
 * @param botMessages Array of messages.
 * @param chatbot_id Chat uuid
 */
export const saveBotMessage = async ({ botMessages }, chatbot_id) => {
  await fetch("/api/database", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        botMessages,
        chat_id: chatbot_id,
      },
    }),
  });
};
