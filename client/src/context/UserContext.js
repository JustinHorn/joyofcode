import React, { useState } from "react";

import useAutomaticAuthorize from "hooks/useAutomaticAuthorize";

const UserContext = React.createContext();
export default UserContext;

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(true);

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

  const projectByCurrentUser = (postedById) => {
    return postedById === user?.id && user;
  };

  return (
    <UserContext.Provider value={{ user, logout, login, projectByCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
