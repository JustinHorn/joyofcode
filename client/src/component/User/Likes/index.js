import React from "react";

import Like from "component/Like";

import useQueryLikes from "hooks/user/useQueryLikes";

import List from "component/List";

const UserLikes = ({ userId }) => {
  const { data, loading, error } = useQueryLikes({ userId });

  if (error) {
    console.log(error);
    throw error;
  }
  if (loading) return "loading";

  return (
    <div className="list px5">
      <List
        Component={Like}
        list={data?.userLikes.map((l) => ({ ...l, ...l.project } || []))}
        Key={"uL"}
      />
    </div>
  );
};

export default UserLikes;
