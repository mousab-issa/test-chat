import React from "react";
import { MessageSection } from "./MessageSection";

export const ChatSection: React.FC = () => {
  // Replace this with actual data from API
  const messages = [
    {
      imageUrl: "https://source.unsplash.com/vpOeXr5wmR4/600x600",
      message: "Welcome to group everyone !",
      isSender: true,
    },
    {
      imageUrl: "https://source.unsplash.com/vpOeXr5wmR4/600x600",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat at praesentium, aut ullam delectus odio error sit rem. Architecto nulla doloribus laborum illo rem enim dolor odio saepe, consequatur quas?",
      isSender: false,
    },
  ];

  return (
    <div className="w-full px-5 flex flex-col justify-between">
      <MessageSection messages={messages} />
      <div className="py-5">
        <input
          className="w-full bg-gray-300 py-5 px-3 rounded-xl"
          type="text"
          placeholder="type your message here..."
        />
      </div>
    </div>
  );
};
