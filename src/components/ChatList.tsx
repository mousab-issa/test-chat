import React from "react";

interface Chat {
  imageUrl: string;
  title: string;
  subtitle: string;
  isSelected: boolean;
}

interface ChatListProps {
  chats: Chat[];
}

export const ChatList: React.FC<ChatListProps> = ({ chats }) => {
  return (
    <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
      <div className="border-b-2 py-4 px-2">
        <input
          type="text"
          placeholder="search chatting"
          className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
        />
      </div>
      {chats.map((chat, index) => (
        <div
          key={index}
          className={`flex flex-row py-4 px-2 items-center border-b-2 ${
            chat.isSelected ? "border-l-4 border-blue-400" : ""
          }`}
        >
          <div className="w-1/4">
            <img
              src={chat.imageUrl}
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">{chat.title}</div>
            <span className="text-gray-500">{chat.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
