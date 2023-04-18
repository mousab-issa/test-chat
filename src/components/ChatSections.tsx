import React, { useContext, useEffect, useRef, useState } from "react";
import ChannelContext from "../context/ChannelContext";
import MessageContext, { Message } from "../context/MessageContext";
import UserContext from "../context/UserContext";
import { ChatBubble } from "./ChatBubble";

export const ChatSection: React.FC = () => {
  const { messages, dispatch } = useContext(MessageContext);
  const { currentChannel } = useContext(ChannelContext);
  const { currentUser } = useContext(UserContext);
  const [inputMessage, setInputMessage] = useState(() => {
    return localStorage.getItem("inputMessage") || "";
  });

  useEffect(() => {
    localStorage.setItem("inputMessage", inputMessage);
  }, [inputMessage]);

  const filteredMessages = messages.filter(
    (message) => message.channelId === currentChannel?.id
  );

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser || !currentChannel || !inputMessage.trim()) {
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      channelId: currentChannel.id,
      senderId: currentUser.id,
      content: inputMessage,
      timestamp: new Date(),
      imageUrl: "",
    };

    dispatch({ type: "SEND_MESSAGE", payload: newMessage });

    setInputMessage("");
    localStorage.removeItem("inputMessage");
    setInputMessage("");
  };

  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  useEffect(() => {
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

  const loadMoreMessages = () => {
    console.log("Load more messages");
  };

  return (
    <div className="flex flex-col w-full h-screen relative">
      <div className="flex-grow overflow-y-auto">
        <button
          onClick={loadMoreMessages}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg my-4 mx-auto"
        >
          Load More Messages
        </button>
        {filteredMessages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
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
