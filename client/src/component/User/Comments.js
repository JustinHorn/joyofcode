import React from "react";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";

import List from "component/List";

import { comment } from "forms";

import Comment from "component/Comment";

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
    <div>
      <List Component={Comment} list={data?.userComments || []} Key={"uC"} />
    </div>
  );
};

export default UserComments;
