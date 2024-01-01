import { StatementContext } from "@/app/context/statement";
import { getBotMessage, saveBotMessage } from "@/app/lib/fetchRequests";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useContext, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ChatBotInput = () => {
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);
  const [input, setInput] = useState("");
  const {
    botMessages,
    addBotMessage,
    removeBotMessage,
    updateBotMessage,
    setIsBotMsgUpdating,
    isBotMsgUpdating,
    userChatBotId,
  } = useContext(StatementContext);

  const { mutate: sendMessage } = useMutation({
    mutationKey: ["sendMessage"],
    // include message to later use with onMutate
    mutationFn: async (_message) => {
      const response = await getBotMessage({ botMessages });
      return response.body;
    },
    onMutate(message) {
      setIsLoading(true);
      addBotMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream");

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

      // clean up
      setIsBotMsgUpdating(true);
      setInput("");
      setIsLoading(false);

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
      if (isBotMsgUpdating === true && botMessages.length > 1) {
        await saveBotMessage({ botMessages }, userChatBotId);
        setIsBotMsgUpdating(false);
      }
    })();
  }, [isBotMsgUpdating]);

  return (
    <div>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-md border-none outline-none">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              const message = {
                id: nanoid(),
                isUserMessage: true,
                text: input,
              };
              sendMessage(message);
            }
          }}
          rows={1}
          maxRows={3}
          value={input}
          autoFocus
          disabled={isLoading}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message..."
          className="block w-full resize-none bg-neutral-800 py-2 pl-2 pr-12 text-lg leading-5 text-neutral-50 caret-neutral-200 outline-none placeholder:text-sm placeholder:italic placeholder:text-neutral-500 disabled:opacity-50"
        />
        <kbd className="absolute inset-y-0 right-0 inline-flex select-none items-center bg-neutral-700/50 px-3">
          {isLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="animate-spin"
            >
              <g fill="#d4d4d4">
                <path
                  fillRule="evenodd"
                  d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
                  clipRule="evenodd"
                  opacity=".2"
                />
                <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
              </g>
            </svg>
          ) : (
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
          )}
        </kbd>
      </div>
    </div>
  );
};

export default ChatBotInput;
