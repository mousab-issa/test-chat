import { useEffect, useState } from "react";

export const useScrollToBottom = () => {
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollToBottom(true);
      } else {
        setShowScrollToBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { showScrollToBottom, setShowScrollToBottom };
};
