// ChannelContext.tsx
import { createContext } from "react";

export interface Channel {
  id: string;
  name: string;
  users: string[];
}

interface ChannelContextInterface {
  channels: Channel[];
  setChannels: (channels: Channel[]) => void;
  currentChannel: Channel | null;
  setCurrentChannel: (channel: Channel | null) => void;
}

const ChannelContext = createContext<ChannelContextInterface>({
  channels: [],
  setChannels: () => {
    return;
  },
  currentChannel: null,
  setCurrentChannel: () => {
    return;
  },
});

export default ChannelContext;
