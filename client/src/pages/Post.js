import React, { useContext } from "react";
import { CreateResource } from "component/Resource";

import UserContext from "context";

const Post = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {!user && <h1>login or register to share your project</h1>}

      {user && <CreateResource />}
    </>
  );
};

export default Post;
