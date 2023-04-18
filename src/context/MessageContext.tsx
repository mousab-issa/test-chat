// MessageContext.tsx
import { createContext } from "react";

export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

interface MessageContextInterface {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  sendMessage: (message: Message) => void;
}

const MessageContext = createContext<MessageContextInterface>({
  messages: [],
  setMessages: () => {
    return;
  },
  sendMessage: () => {
    return;
  },
});

export default MessageContext;
