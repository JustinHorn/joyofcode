import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { resourceQuery } from "forms";

import Feed from "component/Feed";
import useProject from "hooks/useProject";

export const userProjectsQuery = gql`
  query userProjects($id:Int!,$take:Int,$orderBy: ResourceOrderByInput) {
    userProjects(id:$id,take:$take,orderBy: $orderBy) {
      ${resourceQuery}
    }
  }
`;

const UserPage = () => {
  let { id } = useParams();
  id = Number(id);

  const { data, loading, error } = useQuery(userProjectsQuery, {
    variables: { id, take: 10, orderBy: { date: "desc" } },
  });

  if (error) {
    console.log(error);
    throw error;
  }
  if (loading) return "loading";

  return (
    <div>
      <Feed filter={() => true} data={data?.userProjects}></Feed>
      <div>Likes</div>
      <div>Comments</div>
    </div>
  );
};

export default UserPage;
