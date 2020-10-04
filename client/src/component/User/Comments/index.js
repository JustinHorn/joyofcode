import React from "react";

import { useQuery,gql } from "@apollo/client";

import List from "component/List";

import { comment } from "forms";

import UserComment from "component/Comment/UserComment";

export const userCommentsQuery = gql`
  query userComments($id: Int!, $take: Int, $orderBy: CommentOrderByInput) {
    userComments(id: $id, take: $take, orderBy: $orderBy) {
      ${comment}
      postedUnder {
        id
        title
      }
    }
  }
`;

const UserComments = ({ userId }) => {
  const { data, loading, error } = useQuery(userCommentsQuery, {
    variables: { id: userId, take: 10, orderBy: { date: "desc" } },
  });

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
