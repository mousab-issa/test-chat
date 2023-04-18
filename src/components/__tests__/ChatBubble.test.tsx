import { render, screen } from "@testing-library/react";
import { MessageProvider } from "../../context/MessageContext";
import { UserProvider } from "../../context/UserContext";
import ChatBubble, { ChatBubbleProps } from "../ChatBubble";
import { MockedProvider } from "@apollo/client/testing";
import {
  FETCH_LATEST_MESSAGES,
  FETCH_MORE_MESSAGES,
  POST_MESSAGE,
} from "../../graphQl/queries";
import { mockUsers } from "../../data/mock";

const message = {
  messageId: "1",
  channelId: "1",
  userId: "1",
  text: "Test message",
  error: false,
  datetime: new Date().toISOString(),
};

const currentUser = mockUsers[0];

const chatBubbleProps: ChatBubbleProps = {
  message,
};

export const mocks = [
  {
    request: {
      query: FETCH_LATEST_MESSAGES,
      variables: {
        channelId: "1",
      },
    },
    result: {
      data: {
        fetchLatestMessages: [
          {
            messageId: "1",
            text: "Sample message",
            datetime: new Date().toISOString(),
            userId: "1",
          },
        ],
      },
    },
  },
  {
    request: {
      query: FETCH_MORE_MESSAGES,
      variables: {
        channelId: "1",
        messageId: "1",
        old: true,
      },
    },
    result: {
      data: {
        fetchMoreMessages: [
          {
            messageId: "2",
            text: "Older message",
            datetime: new Date().toISOString(),
            userId: "1",
          },
        ],
      },
    },
  },
  {
    request: {
      query: POST_MESSAGE,
      variables: {
        channelId: message.channelId,
        text: message.text,
        userId: currentUser.id,
      },
    },
    result: {
      data: {
        postMessage: {
          id: "2",
          timestamp: new Date().toISOString(),
        },
      },
    },
  },
];

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

describe("ChatBubble", () => {
  test("renders the message text and formatted timestamp", () => {
    render(
      <MockedProvider mocks={mocks}>
        <UserProvider>
          <MessageProvider>
            <ChatBubble {...chatBubbleProps} />
          </MessageProvider>
        </UserProvider>
      </MockedProvider>
    );

    const messageText = screen.getByText(message.text);
    const formattedTimestamp = screen.getByText(
      new Date(message.datetime).toLocaleString("en-US", { timeZone: "UTC" })
    );

    expect(messageText).toBeInTheDocument();
    expect(formattedTimestamp).toBeInTheDocument();
  });
});
