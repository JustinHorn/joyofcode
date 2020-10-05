import React from "react";

import Like from "component/Like";

import { useQuery, gql } from "@apollo/client";

import List from "component/List";

export const userLikeQuery = gql`
  query userLikes($id: Int!, $take: Int, $orderBy: LikesOrderByInput) {
    userLikes(id: $id, take: $take, orderBy: $orderBy) {
      id
      date
      project {
        id
        title
      }
    }
  }
`;

const UserLikes = ({ userId }) => {
  const { data, loading, error } = useQuery(userLikeQuery, {
    variables: { id: userId, take: 20, orderBy: { date: "desc" } },
  });

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
