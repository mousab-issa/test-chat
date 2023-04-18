import React, { createContext, useReducer } from "react";
import { mockUsers } from "../data/mock";

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

interface UserContextInterface {
  currentUser: User | null;
  dispatch: React.Dispatch<UserAction>;
}

export type UserAction = { type: "SET_CURRENT_USER"; payload: User | null };

export const UserContext = createContext<UserContextInterface>({
  currentUser: null,
  dispatch: () => {
    return;
  },
});

export const userReducer = (
  state: User | null,
  action: UserAction
): User | null => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return action.payload;
    default:
      return state;
  }
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const mockCurrentUser: User = mockUsers[0];

  const [currentUser, dispatch] = useReducer(userReducer, mockCurrentUser);

  return (
    <UserContext.Provider value={{ currentUser, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
