import React, { useContext } from "react";

import { Route, Redirect } from "react-router-dom";
import UserContext from "context";

type PrivateRouteProps = {
  path: string;
  children: React.ReactNode;
};

const PrivateRoute = ({ path, children }: PrivateRouteProps) => {
  const { user } = useContext(UserContext);

  if (!user) return <Redirect to={"/"}></Redirect>;

  return <Route path={path}>{user && children}</Route>;
};

export default PrivateRoute;
