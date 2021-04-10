import React from "react";

import UserGeneral from "../UserGeneral";
import Like from "component/Like";

import useQueryLikes from "hooks/user/useQueryLikes";

const UserLikes = ({ userId }) => {
  !userId && (userId = "bsValue");

  const useQuery = () =>
    useQueryLikes({
      userId,
      take: 20,
    });

  return (
    <UserGeneral
      {...{
        listClass: "list row-gap-10",
        useQuery,
        component: Like,
        buttonClass: "my-10",
      }}
    />
  );
};

export default UserLikes;
