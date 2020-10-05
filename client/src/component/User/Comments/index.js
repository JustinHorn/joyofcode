import React from "react";

import List from "component/List";

import UserComment from "component/Comment/UserComment";
import useQueryComments from "hooks/user/useQueryComments";

const UserComments = ({ userId }) => {
  const { data, loading, error } = useQueryComments({ userId });
  if (error) {
    console.log(error);
    throw error;
  }
  if (loading) return "loading";

  return (
    <div className="list">
      <List
        Component={UserComment}
        list={data?.userComments || []}
        Key={"uC"}
      />
    </div>
  );
};

export default UserComments;
