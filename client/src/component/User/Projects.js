import React, { useContext } from "react";
import UserGeneral from "./UserGeneral";

import useQueryProject from "hooks/user/useQueryProjects";

import Project from "component/Project";

const UserProjects = ({ userId, lined }) => {
  const useQuery = () => {
    const props = useQueryProject({
      userId,
      take: 6,
    });

    if (props.list) {
      props.list = props.list.map((i) => ({ ...i, lined }));
    }
    return props;
  };

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
