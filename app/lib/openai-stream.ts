import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export type ChatGPTAgent = "user" | "system";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export interface OpenAIStreamPayload {
  model: string;
  messages: ChatGPTMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  // Check if the response status is not OK (e.g., 4xx or 5xx errors)
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(
      `OpenAI API returned an error: ${res.status} - ${errorBody}`
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      // Callback function to handle parsed SSE events
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || "";
            // Ignore prefix characters like "\n\n"
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            controller.error(e); // Handle JSON parse errors
          }
        }
      }

      const parser = createParser(onParse);

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      // https://web.dev/streams/#asynchronous-iteration
      if (res.body) {
        const reader = res.body.getReader();
        let done = false;
        while (!done) {
          const { done: readDone, value } = await reader.read();
          done = readDone;
          if (!done) {
            parser.feed(decoder.decode(value));
          }
        }
      } else {
        controller.error(new Error("Response body is null"));
      }
    },
  });

  return stream;
}
