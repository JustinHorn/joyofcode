import React from "react";

import { gql } from "apollo-boost";
import { resourceQuery } from "forms";
import { useQuery } from "@apollo/client";
import Feed from "component/Feed";
import Resource from "component/Resource";

import List from "component/List";

export const userProjectsQuery = gql`
  query userProjects($id:Int!,$take:Int,$orderBy: ResourceOrderByInput) {
    userProjects(id:$id,take:$take,orderBy: $orderBy) {
      ${resourceQuery}
    }
  }
`;

const UserProjects = ({ userId }) => {
  const { data, loading, error } = useQuery(userProjectsQuery, {
    variables: { id: userId, take: 10, orderBy: { date: "desc" } },
  });

  if (error) {
    console.log(error);
    throw error;
  }
  if (loading) return "loading";

  return (
    <div className="column-list">
      <List Key="feed" Component={Resource} list={data?.userProjects || []} />
    </div>
  );
};

export default UserProjects;
