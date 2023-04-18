import React, { useContext } from "react";
import UserContext from "../context/UserContext";

interface ChatBubbleProps {
  message: {
    id: string;
    channelId: string;
    senderId: string;
    content: string;
    timestamp: Date;
    imageUrl: string;
  };
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const { currentUser } = useContext(UserContext);
  const isSender = currentUser && currentUser.id === message.senderId;

  const getUserAvatar = (userId: string): string => {
    const user = currentUser?.id === userId ? currentUser : null;
    return user ? user.avatarUrl : "";
  };

  return (
    <div className={`flex justify-${isSender ? "end" : "start"} mb-4`}>
      {!isSender && (
        <img
          src={getUserAvatar(message.senderId)}
          className="object-cover h-8 w-8 rounded-full"
          alt=""
        />
      )}
      <div
        className={`${isSender ? "mr-2" : "ml-2"} py-3 px-4 ${
          isSender ? "bg-blue-400" : "bg-gray-400"
        } rounded-${isSender ? "bl" : "br"}-3xl rounded-tr-3xl rounded-${
          isSender ? "tr" : "tl"
        }-xl text-white`}
      >
        {message.content}
      </div>
      {isSender && (
        <img
          src={getUserAvatar(message.senderId)}
          className="object-cover h-8 w-8 rounded-full"
          alt=""
        />
      )}
    </div>
  );
};

export default ChatBubble;
