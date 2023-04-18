import React from "react";
import { ChatBubble } from "./ChatBubble";

interface Message {
  imageUrl: string;
  message: string;
  isSender: boolean;
}

interface MessageSectionProps {
  messages: Message[];
}

export const MessageSection: React.FC<MessageSectionProps> = ({ messages }) => {
  return (
    <div className="flex flex-col mt-5">
      {messages.map((message, index) => (
        <ChatBubble
          key={index}
          imageUrl={message.imageUrl}
          message={message.message}
          isSender={message.isSender}
        />
      ))}
    </div>
  );
};
