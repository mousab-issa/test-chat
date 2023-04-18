import { useContext, useEffect } from "react";
import UserContext, { User } from "../context/UserContext";
import { mockUsers } from "../data/mock";

export const useCurrentUser = () => {
  const { currentUser, dispatch } = useContext(UserContext);

  useEffect(() => {
    const storedUserId = localStorage.getItem("currentUser");
    if (storedUserId) {
      const storedUser = mockUsers.find((user) => user.id === storedUserId);
      if (storedUser) {
        dispatch({ type: "SET_CURRENT_USER", payload: storedUser });
      }
    }
  }, [dispatch]);

  const setCurrentUser = (user: User) => {
    localStorage.setItem("currentUser", user.id);
    dispatch({ type: "SET_CURRENT_USER", payload: user });
  };

  return { currentUser, setCurrentUser };
};
