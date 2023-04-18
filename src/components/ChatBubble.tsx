import { useMutation } from "@apollo/client";
import clsx from "clsx";
import React, { useContext } from "react";
import MessageContext, { Message } from "../context/MessageContext";
import { mockUsers } from "../data/mock";
import { POST_MESSAGE } from "../graphQl/queries";
import { useCurrentUser } from "../hooks/useCurrentUser";

export interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const { currentUser } = useCurrentUser();
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
    <div
      className={clsx("flex mb-4", isSender ? "justify-end" : "justify-start")}
    >
      {!isSender && (
        <div>
          <img
            src={getUserAvatar(message.userId)}
            className="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div>{message.userId}</div>
        </div>
      )}
      <div
        className={clsx(
          "py-1 px-4 rounded-xl max-w-[50%]",
          isSender ? "mr-2" : "ml-2",
          isSender ? "bg-green-400" : "bg-gray-400",
          "text-white",
          "shadow-md"
        )}
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
        <div>
          <img
            src={getUserAvatar(message.userId)}
            className="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div>{message.userId}</div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
