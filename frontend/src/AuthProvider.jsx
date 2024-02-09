import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(
  JSON.parse(sessionStorage.getItem("currentUser"))
);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("currentUser"))
  );

  useEffect(() => {
    sessionStorage.setItem(
      "currentUser",
      currentUser ? JSON.stringify(currentUser) : null
    );
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
