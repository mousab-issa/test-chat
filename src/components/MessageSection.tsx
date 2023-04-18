import React, { useContext, useState } from "react";
import ChannelContext from "../context/ChannelContext";
import MessageContext, { Message } from "../context/MessageContext";
import UserContext from "../context/UserContext";
import { ChatBubble } from "./ChatBubble";

const MessageSection: React.FC = () => {
  const { messages, dispatch: messageDispatch } = useContext(MessageContext);
  const { currentChannel } = useContext(ChannelContext);
  const { currentUser } = useContext(UserContext);
  const [messageContent, setMessageContent] = useState("");

  const handleSendMessage = () => {
    if (currentUser && currentChannel && messageContent.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        channelId: currentChannel.id,
        senderId: currentUser.id,
        content: messageContent,
        timestamp: new Date(),
        imageUrl: "",
      };

      messageDispatch({ type: "SEND_MESSAGE", payload: message });
      setMessageContent("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageContent(event.target.value);
  };

  const filteredMessages = messages.filter(
    (message) => currentChannel && message.channelId === currentChannel.id
  );

  return (
    <div className="flex flex-col mt-5">
      {filteredMessages.map((message, index) => (
        <ChatBubble key={index} message={message} />
      ))}
      <div className="py-5">
        <input
          className="w-full bg-gray-300 py-5 px-3 rounded-xl"
          type="text"
          placeholder="type your message here..."
          value={messageContent}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage} className="hidden">
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageSection;
