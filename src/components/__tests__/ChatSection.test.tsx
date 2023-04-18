import { render, screen } from "@testing-library/react";
import { MessageProvider } from "../../context/MessageContext";
import { UserProvider } from "../../context/UserContext";
import { MockedProvider } from "@apollo/client/testing";
import { mocks } from "./ChatBubble.test";
import ChatSection from "../ChatSections";
import { ChannelProvider } from "../../context/ChannelContext";

describe("ChatSection", () => {
  test("renders chat section with messages, load older/newer messages buttons, and send message form", () => {
    render(
      <MockedProvider mocks={mocks}>
        <UserProvider>
          <UserProvider>
            <ChannelProvider>
              <MessageProvider>
                <MessageProvider>
                  <ChatSection />
                </MessageProvider>
              </MessageProvider>
            </ChannelProvider>
          </UserProvider>
        </UserProvider>
      </MockedProvider>
    );

    expect(screen.getByText("Load Older Messages")).toBeInTheDocument();
    expect(screen.getByText("Load Newer Messages")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Type your message")
    ).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
  });
});
