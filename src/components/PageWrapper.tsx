import React, { ReactNode } from "react";

export const PageWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="container mx-auto shadow-lg rounded-lg">{children}</div>
  );
};
