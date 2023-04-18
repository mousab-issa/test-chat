import React, { createContext, useReducer } from "react";

export interface Message {
  messageId: string;
  text: string;
  datetime: string;
  userId: string;
  error?: boolean;
  channelId: string;
}

interface MessageContextInterface {
  messages: Message[];
  dispatch: React.Dispatch<MessageAction>;
}

export type MessageAction =
  | { type: "SET_MESSAGES"; payload: Message[] }
  | { type: "SEND_MESSAGE"; payload: Message }
  | { type: "LOAD_OLDER_MESSAGES"; payload: Message[] }
  | { type: "LOAD_NEWER_MESSAGES"; payload: Message[] }
  | { type: "SEND_MESSAGE_ERROR"; payload: Message }
  | { type: "UPDATE_MESSAGE"; payload: { oldId: string; newMessage: Message } }; // Add this line

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
    case "LOAD_OLDER_MESSAGES":
      return [...action.payload, ...state];
    case "LOAD_NEWER_MESSAGES":
      return [...state, ...action.payload];
    case "SEND_MESSAGE_ERROR":
      const failedMessageIndex = state.findIndex(
        (message) => message.messageId === action.payload.messageId
      );
      return [
        ...state.slice(0, failedMessageIndex),
        action.payload,
        ...state.slice(failedMessageIndex + 1),
      ];
    case "UPDATE_MESSAGE":
      const messageIndex = state.findIndex(
        (message) => message.messageId === action.payload.oldId
      );
      return [
        ...state.slice(0, messageIndex),
        action.payload.newMessage,
        ...state.slice(messageIndex + 1),
      ];

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
