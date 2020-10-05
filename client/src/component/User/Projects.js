import React from "react";

import { projectQuery } from "forms";
import { useQuery, gql } from "@apollo/client";
import Feed from "component/Feed";
import Project from "component/Project";

import List from "component/List";

export const userProjectsQuery = gql`
  query userProjects($id:Int!,$take:Int,$orderBy: ProjectOrderByInput) {
    userProjects(id:$id,take:$take,orderBy: $orderBy) {
      ...ProjectQuery
    }
  }

  fragment ProjectQuery on Project {
    ${projectQuery}
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
      <List Key="feed" Component={Project} list={data?.userProjects || []} />
    </div>
  );
};

export default UserProjects;
