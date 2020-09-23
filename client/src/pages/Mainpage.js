import React, { useContext } from "react";
import Feed from "component/Feed";

import UserContext from "context";

const Mainpage = () => {
  const { user } = useContext(UserContext);

  return <Feed />;
};

export default Mainpage;
