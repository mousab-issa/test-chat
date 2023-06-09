import React from "react";
import { Message } from "../context/MessageContext";

import { ChatBubble } from "./ChatBubble";
import { FETCH_MORE_MESSAGES, POST_MESSAGE } from "../graphQl/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useMessages } from "../hooks/useMessages";
import { useInputMessage } from "../hooks/useInputMessage";
import { useScrollToBottom } from "../hooks/useScrollToBottom";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const ChatSection: React.FC = () => {
  const { messages, currentChannel, dispatch } = useMessages();
  const { inputMessage, setInputMessage } = useInputMessage();
  const { showScrollToBottom } = useScrollToBottom();
  const { currentUser } = useCurrentUser();

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);
  const olderMessagesEndRef = React.useRef<HTMLDivElement | null>(null);

  const filteredMessages = messages.filter(
    (message) => message.channelId === currentChannel?.id
  );

  React.useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  const [postMessageMutation] = useMutation(POST_MESSAGE);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser || !currentChannel || !inputMessage.trim()) {
      return;
    }

    const tempMessageId = Date.now().toString();

    const tempMessage: Message = {
      messageId: tempMessageId,
      channelId: currentChannel.id,
      userId: currentUser.id,
      text: inputMessage,
      error: false,
      datetime: new Date().toISOString(),
    };

    dispatch({ type: "SEND_MESSAGE", payload: tempMessage });

    try {
      const { data } = await postMessageMutation({
        variables: {
          channelId: currentChannel.id,
          text: inputMessage,
          userId: currentUser.id,
        },
      });

      const newMessage = {
        ...tempMessage,
        datetime: data.postMessage.datetime, // Change this line to use 'datetime' instead of 'timestamp'
      };

      dispatch({
        type: "UPDATE_MESSAGE",
        payload: { oldId: tempMessageId, newMessage },
      });

      setInputMessage("");
      localStorage.removeItem("inputMessage");
    } catch (error) {
      console.error("Error sending message:", error);
      dispatch({
        type: "SEND_MESSAGE_ERROR",
        payload: { ...tempMessage, error: true },
      });
    }
  };

  const { fetchMore } = useQuery(FETCH_MORE_MESSAGES, {
    variables: { channelId: currentChannel?.id, messageId: "", old: true },
  });

  const handleLoadOlderMessages = async () => {
    try {
      const { data } = await fetchMore({
        variables: {
          channelId: currentChannel?.id,
          messageId: filteredMessages[0]?.messageId,
          old: true,
        },
      });

      const olderMessages = data.fetchMoreMessages.map((message: Message) => {
        if (!currentChannel?.id) {
          return message;
        }

        return { ...message, channelId: currentChannel.id, error: false };
      });

      dispatch({ type: "LOAD_OLDER_MESSAGES", payload: olderMessages });
      olderMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error loading older messages:", error);
    }
  };

  const handleLoadNewerMessages = async () => {
    try {
      const { data } = await fetchMore({
        variables: {
          channelId: currentChannel?.id,
          messageId: filteredMessages[filteredMessages.length - 1]?.messageId,
          old: false,
        },
      });

      const newerMessages = data.fetchMoreMessages.map((message: Message) => {
        if (!currentChannel?.id) {
          return message;
        }

        return { ...message, channelId: currentChannel.id, error: false };
      });
      dispatch({ type: "LOAD_NEWER_MESSAGES", payload: newerMessages });
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error loading newer messages:", error);
    }
  };
  return (
    <div className="flex flex-col w-full h-screen relative">
      <div className="flex-grow overflow-y-auto p-4">
        <div ref={olderMessagesEndRef} />
        {filteredMessages.map((message, i) => (
          <ChatBubble key={message.text + i} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <button
        onClick={handleLoadOlderMessages}
        className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-2 rounded-full hover:shadow-lg"
      >
        <svg
          className="w-6 h-6 hover:w-10 hover:h-10  transition-all ease-in-out"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>

      <button
        onClick={handleLoadNewerMessages}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-2 rounded-full hover:shadow-lg"
      >
        <svg
          className="w-6 h-6 hover:w-10 hover:h-10  transition-all ease-in-out"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>

      <form
        onSubmit={handleSubmit}
        className="border-t p-4 flex items-center space-x-4 bg-white w-full"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
          placeholder="Type your message"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </form>
      {showScrollToBottom && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-16 right-4 bg-blue-500 text-white p-2 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="24px"
            height="24px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatSection;
