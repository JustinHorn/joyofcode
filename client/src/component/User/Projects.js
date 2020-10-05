import React from "react";

import Project from "component/Project";

import List from "component/List";

import useQueryProject from "hooks/user/useQueryProjects";

const UserProjects = ({ userId }) => {
  const { data, loading, error } = useQueryProject({ userId });

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
