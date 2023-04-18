import { useState, useEffect } from "react";

export const useInputMessage = () => {
  const [inputMessage, setInputMessage] = useState(() => {
    return localStorage.getItem("inputMessage") || "";
  });

  useEffect(() => {
    localStorage.setItem("inputMessage", inputMessage);
  }, [inputMessage]);

  return { inputMessage, setInputMessage };
};
