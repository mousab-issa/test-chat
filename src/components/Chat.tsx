import React from "react";
import { ChatList } from "./ChatList";
import { ChatSection } from "./ChatSections";
import { PageWrapper } from "./PageWrapper";

export const Chat: React.FC = () => {
  const chats = [
    {
      imageUrl: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
      title: "Luis1994",
      subtitle: "Pick me at 9:00 Am",
      isSelected: false,
    },
    {
      imageUrl: "https://source.unsplash.com/otT2199XwI8/600x600",
      title: "Everest Trip 2021",
      subtitle: "Hi Sam, Welcome",
      isSelected: false,
    },
    {
      imageUrl: "https://source.unsplash.com/L2cxSuKWbpo/600x600",
      title: "MERN Stack",
      subtitle: "Lusi : Thanks Everyone",
      isSelected: true,
    },
  ];

  return (
    <PageWrapper>
      <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2"></div>
      <div className="flex flex-row justify-between bg-white">
        <ChatList chats={chats} />
        <ChatSection />
        <div className="w-2/5 border-l-2 px-5"></div>
      </div>
    </PageWrapper>
  );
};
