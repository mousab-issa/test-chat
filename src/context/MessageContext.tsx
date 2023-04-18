import React, { createContext, useReducer } from "react";

export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  imageUrl: string;
}

interface MessageContextInterface {
  messages: Message[];
  dispatch: React.Dispatch<MessageAction>;
}

export type MessageAction =
  | { type: "SET_MESSAGES"; payload: Message[] }
  | { type: "SEND_MESSAGE"; payload: Message };

const MessageContext = createContext<MessageContextInterface>({
  messages: [],
  dispatch: () => {
    return;
  },
});

const messageReducer = (state: Message[], action: MessageAction): Message[] => {
  switch (action.type) {
    case "SET_MESSAGES":
      return action.payload;
    case "SEND_MESSAGE":
      return [...state, action.payload];
    default:
      return state;
  }
};

interface MessageProviderProps {
  children: React.ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  const [messages, dispatch] = useReducer(messageReducer, []);

  return (
    <MessageContext.Provider value={{ messages, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;