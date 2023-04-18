import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import MessageContext, { Message } from "../context/MessageContext";
import UserContext from "../context/UserContext";
import { mockUsers } from "../data/mock";
import { POST_MESSAGE } from "../graphQl/queries";

export interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const { currentUser } = useContext(UserContext);
  const { dispatch } = useContext(MessageContext);

  const [postMessageMutation] = useMutation(POST_MESSAGE);

  const isSender = currentUser && currentUser.id === message.userId;

  const formattedTimestamp = message.datetime
    ? new Date(message.datetime).toLocaleString("en-US", {
        timeZone: "UTC",
      })
    : "";

  const handleResend = async () => {
    if (message.error) {
      try {
        const { data } = await postMessageMutation({
          variables: {
            channelId: message.channelId,
            text: message.text,
            userId: message.userId,
          },
        });

        const newMessage = {
          ...message,
          id: data.postMessage.id,
          timestamp: new Date(data.postMessage.timestamp),
          error: false,
        };
        dispatch({
          type: "UPDATE_MESSAGE",
          payload: { oldId: message.messageId, newMessage },
        });
      } catch (error) {
        console.error("Error resending message:", error);
      }
    }
  };

  const getUserAvatar = (userId: string): string => {
    const user =
      currentUser?.id === userId
        ? currentUser
        : mockUsers.find((user) => user.id === userId);
    return user ? user.avatarUrl : "";
  };

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}>
      {!isSender && (
        <img
          src={getUserAvatar(message.userId)}
          className="object-cover h-8 w-8 rounded-full"
          alt=""
        />
      )}
      <div
        className={`${isSender ? "mr-2" : "ml-2"} py-3 px-4 ${
          isSender ? "bg-blue-400" : "bg-gray-400"
        } ${
          isSender ? "rounded-bl-3xl" : "rounded-br-3xl"
        } rounded-tr-3xl rounded-${isSender ? "tr" : "tl"}-xl text-white`}
        onClick={handleResend}
      >
        <div>{message.text}</div>
        <div className="text-xs text-gray-200 mt-1">
          {formattedTimestamp}
          {message.error
            ? "Error. Click to resend."
            : isSender && <>&nbsp;Sent</>}
        </div>
      </div>
      {isSender && (
        <img
          src={getUserAvatar(message.userId)}
          className="object-cover h-8 w-8 rounded-full"
          alt=""
        />
      )}
    </div>
  );
};

export default ChatBubble;
