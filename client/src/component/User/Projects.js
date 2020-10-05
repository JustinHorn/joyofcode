import React from "react";
import UserGeneral from "./UserGeneral";

import useQueryProject from "hooks/user/useQueryProjects";

import Project from "component/Project";

const UserProjects = ({ userId }) => {
  const useQuery = () =>
    useQueryProject({
      userId,
      take: 6,
    });

  return (
    <UserGeneral
      {...{
        listClass: "column-list",
        useQuery,
        component: Project,
      }}
    />
  );
};

export default UserProjects;
