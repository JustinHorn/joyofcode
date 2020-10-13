import React, { useContext } from "react";
import UserGeneral from "./UserGeneral";

import Project from "component/Project";
import ProjectLayoutContext from "context/ProjectLayout";

const UserProjects = ({ userId, queryProps }) => {
  !userId && (userId = "bsValue");
  const useQuery = () => queryProps;

  const { lined } = useContext(ProjectLayoutContext);

  return (
    <UserGeneral
      {...{
        listClass: lined ? "list px5" : "feed",
        useQuery,
        component: Project,
        buttonClass: lined ? "my-10" : "my-20",
      }}
    />
  );
};

export default UserProjects;
