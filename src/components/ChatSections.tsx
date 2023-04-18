import React, { useContext } from "react";
import ChannelContext from "../context/ChannelContext";
import MessageContext, { Message } from "../context/MessageContext";
import UserContext from "../context/UserContext";
import { ChatBubble } from "./ChatBubble";
import {
  FETCH_LATEST_MESSAGES,
  FETCH_MORE_MESSAGES,
  POST_MESSAGE,
} from "../graphQl/queries";
import { useMutation, useQuery } from "@apollo/client";

const useMessages = () => {
  const { messages, dispatch } = useContext(MessageContext);
  const { currentChannel } = useContext(ChannelContext);

  const { data } = useQuery(FETCH_LATEST_MESSAGES, {
    variables: { channelId: currentChannel?.id },
  });

  React.useEffect(() => {
    if (data) {
      dispatch({ type: "SET_MESSAGES", payload: data.fetchLatestMessages });
    }
  }, [data, dispatch]);

  return { messages, currentChannel, dispatch };
};

const useInputMessage = () => {
  const [inputMessage, setInputMessage] = React.useState(() => {
    return localStorage.getItem("inputMessage") || "";
  });

  React.useEffect(() => {
    localStorage.setItem("inputMessage", inputMessage);
  }, [inputMessage]);

  return { inputMessage, setInputMessage };
};

const useScrollToBottom = () => {
  const [showScrollToBottom, setShowScrollToBottom] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollToBottom(true);
      } else {
        setShowScrollToBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { showScrollToBottom, setShowScrollToBottom };
};

export const ChatSection: React.FC = () => {
  const { messages, currentChannel, dispatch } = useMessages();
  const { inputMessage, setInputMessage } = useInputMessage();
  const { showScrollToBottom } = useScrollToBottom();

  const { currentUser } = useContext(UserContext);
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  const filteredMessages = messages.filter(
    (message) => message.channelId === currentChannel?.id
  );

  React.useEffect(() => {
    console.log(messages);
  }, [messages]);

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
      datetime: Date.now().toString(),
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
        id: data.postMessage.id,
        timestamp: new Date(data.postMessage.timestamp),
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

      const olderMessages = data.fetchMoreMessages;
      dispatch({ type: "LOAD_OLDER_MESSAGES", payload: olderMessages });
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

      const newerMessages = data.fetchMoreMessages;
      dispatch({ type: "LOAD_NEWER_MESSAGES", payload: newerMessages });
    } catch (error) {
      console.error("Error loading newer messages:", error);
    }
  };
  return (
    <div className="flex flex-col w-full h-screen relative">
      <div className="flex-grow overflow-y-auto">
        {filteredMessages.map((message) => (
          <ChatBubble key={message.text} message={message} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <button
        onClick={handleLoadOlderMessages}
        className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Load Older Messages
      </button>

      {/* Load Newer Messages Button */}
      <button
        onClick={handleLoadNewerMessages}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Load Newer Messages
      </button>

      <form
        onSubmit={handleSubmit}
        className="border-t p-4 flex items-center space-x-4 bg-white w-full"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Type your message"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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
