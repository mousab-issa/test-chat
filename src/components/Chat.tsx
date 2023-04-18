import React from "react";
import { ChannelProvider } from "../context/ChannelContext";
import { MessageProvider } from "../context/MessageContext";
import { UserProvider } from "../context/UserContext";

import { ChannelsList } from "./ChannelsList";
import { ChatSection } from "./ChatSections";
import { PageWrapper } from "./PageWrapper";

export const Chat: React.FC = () => {
  return (
    <UserProvider>
      <ChannelProvider>
        <MessageProvider>
          <PageWrapper>
            <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2"></div>
            <div className="flex flex-row justify-between bg-white">
              <ChannelsList channels={[]} />
              <ChatSection />
              <div className="w-2/5 border-l-2 px-5"></div>
            </div>
          </PageWrapper>
        </MessageProvider>
      </ChannelProvider>
    </UserProvider>
  );
};
