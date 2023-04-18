import React from "react";

interface ChatBubbleProps {
  imageUrl: string;
  message: string;
  isSender: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  imageUrl,
  message,
  isSender,
}) => {
  return (
    <div className={`flex justify-${isSender ? "end" : "start"} mb-4`}>
      {!isSender && (
        <img
          src={imageUrl}
          className="object-cover h-8 w-8 rounded-full"
          alt=""
        />
      )}
      <div
        className={`${isSender ? "mr-2" : "ml-2"} py-3 px-4 ${
          isSender ? "bg-blue-400" : "bg-gray-400"
        } rounded-${isSender ? "bl" : "br"}-3xl rounded-tr-3xl rounded-${
          isSender ? "tr" : "tl"
        }-xl text-white`}
      >
        {message}
      </div>
      {isSender && (
        <img
          src={imageUrl}
          className="object-cover h-8 w-8 rounded-full"
          alt=""
        />
      )}
    </div>
  );
};
