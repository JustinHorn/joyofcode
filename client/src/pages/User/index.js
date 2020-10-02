import React from "react";
import { useParams } from "react-router-dom";

import UserProjects from "component/User/Projects";

import UserComments from "component/User/Comments";

import UserLikes from "component/User/Likes";

const UserPage = () => {
  let { id } = useParams();
  id = Number(id);

  return (
    <div>
      <h2>Projects</h2>
      <UserProjects userId={id}></UserProjects>
      <h2>Likes</h2>
      <UserLikes userId={id} />

      <h2>Comments</h2>

      <UserComments userId={id}></UserComments>
    </div>
  );
};

export default UserPage;
