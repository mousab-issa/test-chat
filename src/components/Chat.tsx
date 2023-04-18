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
            <div className="flex flex-row justify-between bg-gray-100">
              <ChannelsList />
              <ChatSection />
            </div>
          </PageWrapper>
        </MessageProvider>
      </ChannelProvider>
    </UserProvider>
  );
};
