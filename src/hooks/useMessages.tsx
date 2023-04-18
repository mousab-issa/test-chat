import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import ChannelContext from "../context/ChannelContext";
import MessageContext, { Message } from "../context/MessageContext";
import { FETCH_LATEST_MESSAGES } from "../graphQl/queries";

export const useMessages = () => {
  const { messages, dispatch } = useContext(MessageContext);
  const { currentChannel } = useContext(ChannelContext);

  const { data } = useQuery<{ fetchLatestMessages: Message[] }>(
    FETCH_LATEST_MESSAGES,
    {
      variables: { channelId: currentChannel?.id },
    }
  );

  React.useEffect(() => {
    if (data) {
      dispatch({
        type: "SET_MESSAGES",
        payload: data.fetchLatestMessages.map((message) => {
          if (!currentChannel?.id) {
            return message;
          }

          return { ...message, channelId: currentChannel.id, error: false };
        }),
      });
    }
  }, [data, dispatch]);

  return { messages, currentChannel, dispatch };
};
