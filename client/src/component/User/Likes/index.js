import React from "react";

import UserGeneral from "../UserGeneral";
import Like from "component/Like";

import useQueryLikes from "hooks/user/useQueryLikes";

const UserLikes = ({ userId }) => {
  const useQuery = () =>
    useQueryLikes({
      userId,
      take: 20,
    });

  return (
    <UserGeneral
      {...{
        listClass: "list px5",
        useQuery,
        component: Like,
        buttonClass: "my-10",
      }}
    />
  );
};

export default UserLikes;
