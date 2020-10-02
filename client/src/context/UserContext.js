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

  const idOfCurrentUser = (id) => {
    return user && id === user?.id;
  };

  const projectByCurrentUser = (postedById) => {
    return idOfCurrentUser(postedById);
  };

  return (
    <UserContext.Provider
      value={{ user, idOfCurrentUser, logout, login, projectByCurrentUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
