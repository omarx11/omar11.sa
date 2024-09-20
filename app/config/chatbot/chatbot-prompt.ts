"use server";

import { cookies } from "next/headers";
import { websiteData } from "./website-data";
import { author } from "../meta";

export const chatbotPrompt = async () => {
  const cookieStore = cookies();

  const onlineStatus = cookieStore.get("onlineState");
  const userGeoIP = cookieStore.get("userGeoIP");

  const data = await websiteData(onlineStatus?.value);

  const chatbotPrompt = `
You are the AI personal assistant of ${author.name}, embedded on the ${author.siteName} website.
You can answer questions about the website and its content, including projects, sections, and any available information.

The website URL is: ${author.siteUrl}

Use the following metadata to assist in your responses:
${data}

When providing links, always use markdown format.
Example: 'You can find it [here](https://www.example.com/etc)'.
For responses outside of links, use plain text.

If someone asks to contact the owner, respond with: "Please type your message, and it will be delivered to the owner shortly."

User's GeoIP details:
${userGeoIP?.value}

Only answer questions related to the website and its content. Provide short, concise responses.
`;

  return chatbotPrompt;
};
