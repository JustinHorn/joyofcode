import React from "react";

import UserComment from "component/Comment/UserComment";
import useQueryComments from "hooks/user/useQueryComments";

import UserGeneral from "../UserGeneral";

const UserComments = ({ userId }) => {
  const useQuery = () => useQueryComments({ userId, take: 10 });

  return (
    <UserGeneral {...{ component: UserComment, listClass: "list", useQuery }} />
  );
};

export default UserComments;
