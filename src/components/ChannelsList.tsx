import React, { useContext } from "react";
import ChannelContext, { Channel } from "../context/ChannelContext";
import UserContext, { User } from "../context/UserContext";
import { mockUsers } from "../data/mock";

export const ChannelsList: React.FC = () => {
  const { channels, dispatch, currentChannel } = useContext(ChannelContext);
  const { currentUser, dispatch: userDispatch } = useContext(UserContext);

  const handleChannelClick = (channel: Channel) => {
    dispatch({ type: "SET_CURRENT_CHANNEL", payload: channel });
  };

  const handleUserClick = (user: User) => {
    userDispatch({ type: "SET_CURRENT_USER", payload: user });
  };

  return (
    <div className="flex flex-col w-1/3 border-r-2 bg-white">
      <div className="border-b-2 py-4 px-2">
        <div className="relative inline-block w-full">
          <select
            className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={currentUser?.id}
            onChange={(e) => {
              const selectedUser = mockUsers.find(
                (user) => user.id === e.target.value
              );
              if (selectedUser) handleUserClick(selectedUser);
            }}
          >
            {mockUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
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
