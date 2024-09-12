import type { BotMessage } from "@/app/lib/validators/bot-message";
import { StatementContext } from "@/app/context/statement";
import {
  KeyboardEvent,
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMutation } from "@tanstack/react-query";
import { getBotMessage } from "./actions";
import { saveBotMessage } from "@/app/lib/server-actions";
import TextareaAutosize from "react-textarea-autosize";
import { nanoid } from "nanoid";
import { Loading } from "../icons/Loading";

const ChatBotInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState<string>("");
  const {
    botMessages,
    chatbot_id,
    addBotMessage,
    removeBotMessage,
    updateBotMessage,
  } = useContext(StatementContext);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async () => {
      const response = await getBotMessage({ botMessages });
      return response.body;
    },
    onMutate(message: BotMessage) {
      addBotMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("Error no stream");

      // construct new message to add
      const id = nanoid();
      const responseMessage = {
        id,
        isUserMessage: false,
        text: "",
      };

      // add new message to state
      addBotMessage(responseMessage);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateBotMessage(id, (prev) => prev + chunkValue);
      }

      setInput("");

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },
    onError: (_, message) => {
      removeBotMessage(message.id);
      textareaRef.current?.focus();
    },
  });

  useEffect(() => {
    (async () => {
      if (!isPending && botMessages.length > 1) {
        await saveBotMessage({ botMessages }, chatbot_id);
      }
    })();
  }, [botMessages, chatbot_id, isPending]);

  const handleSubmit = (
    e: KeyboardEvent<HTMLTextAreaElement> | MouseEvent<HTMLButtonElement>
  ) => {
    if (input.trim() !== "") {
      if (
        e.type === "click" ||
        (e.type === "keydown" &&
          (e as KeyboardEvent).key === "Enter" &&
          !(e as KeyboardEvent).shiftKey)
      ) {
        e.preventDefault();
        const message = {
          id: nanoid(),
          isUserMessage: true,
          text: input.trim(),
        };
        sendMessage(message);
      }
    }
  };

  return (
    <div>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-md border-none outline-none">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={handleSubmit}
          rows={1}
          maxRows={3}
          value={input}
          autoFocus
          disabled={isPending}
          onChange={(e) => setInput(e.target.value.replace(/^\s+/, ""))}
          placeholder="Write a message..."
          className="block w-full resize-none bg-neutral-800 py-2 pl-2 pr-12 text-lg leading-5 text-neutral-50 caret-neutral-200 outline-none placeholder:text-sm placeholder:italic placeholder:text-neutral-500 disabled:opacity-50"
        />
        <kbd className="absolute inset-y-0 right-0 inline-flex select-none items-center bg-neutral-700/50">
          {isPending ? (
            <Loading className="mx-3 animate-spin" />
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full border-0 px-3 outline-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
              >
                <g fill="#c4c4c4" fillRule="evenodd" clipRule="evenodd">
                  <path d="M3 14a1 1 0 0 1 1-1h12a3 3 0 0 0 3-3V6a1 1 0 1 1 2 0v4a5 5 0 0 1-5 5H4a1 1 0 0 1-1-1z" />
                  <path d="M3.293 14.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 1.414L5.414 14l3.293 3.293a1 1 0 1 1-1.414 1.414l-4-4z" />
                </g>
              </svg>
            </button>
          )}
        </kbd>
      </div>
    </div>
  );
};

export default ChatBotInput;
