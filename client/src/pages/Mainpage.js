import React, { useContext } from "react";
import Feed from "component/Feed";

import UserContext from "context";

const Mainpage = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user && <h1>Hello {user.name}</h1>}

      <Feed />
    </div>
  );
};

export default Mainpage;
