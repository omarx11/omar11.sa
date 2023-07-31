import axios from "axios";
import { PATHNAME_URL } from "@/app/config/sitePath";

/**
 * GET my repository from github
 * @param message The user message.
 * @returns An array of messages.
 */
export async function getRepository() {
  const res = await fetch(`${PATHNAME_URL}/api/repos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
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
