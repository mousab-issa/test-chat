// ChannelsList.tsx
import React, { useContext } from "react";
import ChannelContext, { Channel } from "../context/ChannelContext";

interface ChannelsListProps {
  channels: Channel[];
}

export const ChannelsList: React.FC<ChannelsListProps> = ({ channels }) => {
  const { dispatch, currentChannel } = useContext(ChannelContext);

  const handleChannelClick = (channel: Channel) => {
    dispatch({ type: "SET_CURRENT_CHANNEL", payload: channel });
  };

  return (
    <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
      <div className="border-b-2 py-4 px-2">
        <input
          type="text"
          placeholder="search chatting"
          className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
        />
      </div>
      {channels.map((channel) => (
        <div
          key={channel.id}
          onClick={() => handleChannelClick(channel)}
          className={`flex flex-row py-4 px-2 items-center border-b-2 ${
            currentChannel?.id === channel.id
              ? "border-l-4 border-blue-400"
              : ""
          } cursor-pointer`}
        >
          <div className="w-1/4">
            <img
              src={channel.imageUrl}
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">{channel.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
