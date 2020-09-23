import React, { useContext } from "react";

import { Route, Redirect } from "react-router-dom";
import UserContext from "context";

const PrivateRoute = ({ path, children }) => {
  const { user } = useContext(UserContext);

  if (!user) return <Redirect to={"/"}></Redirect>;

  return <Route path={path}>{user && children}</Route>;
};

export default PrivateRoute;
