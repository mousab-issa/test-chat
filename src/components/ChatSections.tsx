import React, { useContext } from "react";
import ChannelContext from "../context/ChannelContext";
import MessageContext from "../context/MessageContext";
import { ChatBubble } from "./ChatBubble";

export const ChatSection: React.FC = () => {
  const { messages } = useContext(MessageContext);
  const { currentChannel } = useContext(ChannelContext);

  const filteredMessages = messages.filter(
    (message) => message.channelId === currentChannel?.id
  );

  return (
    <div className="chat-section overflow-y-auto h-full">
      {filteredMessages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatSection;
