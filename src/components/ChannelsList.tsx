import React, { useContext } from "react";
import ChannelContext, { Channel } from "../context/ChannelContext";
import { mockUsers } from "../data/mock";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const ChannelsList: React.FC = () => {
  const { channels, dispatch, currentChannel } = useContext(ChannelContext);
  const { currentUser, setCurrentUser } = useCurrentUser();

  const handleChannelClick = (channel: Channel) => {
    dispatch({ type: "SET_CURRENT_CHANNEL", payload: channel });
  };

  return (
    <div className="flex flex-col w-1/3 border-r-2 bg-white">
      <div className="border-b-2 py-4 px-2">
        <div className="flex flex-wrap justify-start">
          {mockUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setCurrentUser(user)}
              className={`px-4 py-2 mr-2 mb-2 rounded-xl cursor-pointer ${
                currentUser?.id === user.id
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {user.name}
            </div>
          ))}
        </div>
      </div>
      {channels.map((channel) => (
        <div
          key={channel.id}
          onClick={() => handleChannelClick(channel)}
          className={`flex flex-row py-4 px-2 items-center hover:bg-green-100 ${
            currentChannel?.id === channel.id && "bg-green-100"
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

export default ChannelsList;
