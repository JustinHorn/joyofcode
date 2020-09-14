import React, { useState } from "react";

import useAutomaticAuthorize from "hooks/useAutomaticAuthorize";

const UserContext = React.createContext();
export default UserContext;

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useAutomaticAuthorize(setUser);

  const logout = () => {
    localStorage.setItem("auth_token", "");
    setUser(null);
  };

  const login = (user, token) => {
    setUser(user);
    saveUserData(token);
  };

  const saveUserData = (token) => {
    localStorage.setItem("auth_token", token);
  };

  return (
    <UserContext.Provider value={{ user, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};
