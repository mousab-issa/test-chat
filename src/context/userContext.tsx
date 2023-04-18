// UserContext.tsx
import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

interface UserContextInterface {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextInterface>({
  currentUser: null,
  setCurrentUser: () => {
    return;
  },
});

export default UserContext;
