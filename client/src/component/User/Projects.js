import React, { useContext } from "react";
import UserGeneral from "./UserGeneral";

import useQueryProject from "hooks/user/useQueryProjects";

import Project from "component/Project";

const UserProjects = ({ userId, small }) => {
  const useQuery = () => {
    const props = useQueryProject({
      userId,
      take: 6,
    });

    if (props.list) {
      props.list = props.list.map((i) => ({ ...i, small }));
    }
    return props;
  };

  return (
    <UserGeneral
      {...{
        listClass: small ? "list px5" : "column-list",
        useQuery,
        component: Project,
      }}
    />
  );
};

export default UserProjects;
