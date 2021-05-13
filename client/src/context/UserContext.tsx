import React, { useState } from "react";

import useAutomaticAuthorize from "hooks/useAutomaticAuthorize";

export const NoUser: User = {
  id: -1,
  name: "",
};

type UserContextProps = {
  user: User;
  loggedIn:boolean;
  isCurrentUser: (id: number) => boolean;
  logout: () => void;
  login: (user: User, token: string) => void;
  saveUserData: (token: string) => void;
  setUser: (user: User) => void;
};

const UserContext = React.createContext<UserContextProps>({
  user: NoUser,
  loggedIn:false,
  isCurrentUser: (id) => false,
  logout: () => {},
  login: (u, t) => {},
  saveUserData: (t) => {},
  setUser: (u) => {},
});
export default UserContext;

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User>(NoUser);

  useAutomaticAuthorize(setUser);

  const logout = () => {
    localStorage.setItem("auth_token", "");
    setUser(NoUser);
  };

  const login = (user: User, token: string) => {
    setUser(user);
    saveUserData(token);
  };

  const saveUserData = (token: string) => {
    localStorage.setItem("auth_token", token);
  };

  const isCurrentUser = (id: number): boolean => {
    return id === user?.id;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loggedIn: user !== NoUser,
        isCurrentUser,
        logout,
        login,
        saveUserData,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
