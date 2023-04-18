import React, { createContext, useReducer } from "react";

export interface Channel {
  id: string;
  name: string;
  users: string[];
  imageUrl: string;
}

interface ChannelContextInterface {
  channels: Channel[];
  currentChannel: Channel | null;
  dispatch: React.Dispatch<ChannelAction>;
}

export type ChannelAction =
  | { type: "SET_CHANNELS"; payload: Channel[] }
  | { type: "SET_CURRENT_CHANNEL"; payload: Channel | null };

const ChannelContext = createContext<ChannelContextInterface>({
  channels: [],
  currentChannel: null,
  dispatch: () => {
    return;
  },
});

const channelReducer = (state: Channel[], action: ChannelAction): Channel[] => {
  switch (action.type) {
    case "SET_CHANNELS":
      return action.payload;
    default:
      return state;
  }
};

const currentChannelReducer = (
  state: Channel | null,
  action: ChannelAction
): Channel | null => {
  switch (action.type) {
    case "SET_CURRENT_CHANNEL":
      return action.payload;
    default:
      return state;
  }
};

interface ChannelProviderProps {
  children: React.ReactNode;
}

export const ChannelProvider: React.FC<ChannelProviderProps> = ({
  children,
}) => {
  const mockChannels: Channel[] = [
    {
      id: "1",
      name: "Channel 1",
      users: ["1", "2"],
      imageUrl: "https://example.com/channel1.jpg",
    },
    {
      id: "2",
      name: "Channel 2",
      users: ["1", "3"],
      imageUrl: "https://example.com/channel2.jpg",
    },
  ];

  const [channels, dispatchChannels] = useReducer(channelReducer, mockChannels);
  const [currentChannel, dispatchCurrentChannel] = useReducer(
    currentChannelReducer,
    mockChannels[0]
  );

  const dispatch = (action: ChannelAction) => {
    dispatchChannels(action);
    dispatchCurrentChannel(action);
  };

  return (
    <ChannelContext.Provider value={{ channels, currentChannel, dispatch }}>
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelContext;
