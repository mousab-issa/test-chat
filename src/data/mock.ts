import { Channel } from "../context/ChannelContext";
import { User } from "../context/UserContext";

export const mockUsers: User[] = [
  {
    id: "Sam",
    name: "John Doe",
    avatarUrl: "https://picsum.photos/205",
  },
  {
    id: "Russell",
    name: "Jane Smith",
    avatarUrl: "https://picsum.photos/201",
  },
  {
    id: "Joyse",
    name: "Bob Ross",
    avatarUrl: "https://picsum.photos/202",
  },
];

export const mockChannels: Channel[] = [
  {
    id: "1",
    name: "Channel 1",
    users: mockUsers.map((user) => user.id),
    imageUrl: "https://picsum.photos/201",
  },
  {
    id: "2",
    name: "Channel 2",
    users: mockUsers.map((user) => user.id),
    imageUrl: "https://picsum.photos/206",
  },
  {
    id: "3",
    name: "Channel 3",
    users: mockUsers.map((user) => user.id),
    imageUrl: "https://picsum.photos/206",
  },
];
