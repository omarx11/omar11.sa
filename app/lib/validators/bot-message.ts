import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  isUserMessage: z.boolean(),
});

// array validator
export const BotMessageArraySchema = z.array(MessageSchema);

export type BotMessage = z.infer<typeof MessageSchema>;
