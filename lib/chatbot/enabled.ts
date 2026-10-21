/**
 * Whether the AI assistant is switched on (`AI_ASSISTANT_ENABLED="true"`). Off
 * by default, so a copy of the site works without a model server: the chat
 * button then opens a "disabled" notice, and the chat API answers 503.
 * Server-only (reads the environment); the header passes it to the button.
 */
export const assistantEnabled = () =>
  process.env.AI_ASSISTANT_ENABLED === "true";

export const DISABLED_MESSAGE = "The AI assistant is disabled on this site.";
