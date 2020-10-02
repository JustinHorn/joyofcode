import React from "react";
import { useParams } from "react-router-dom";

import UserProjects from "component/User/Projects";

import UserComments from "component/User/Comments";

import UserLikes from "component/User/Likes";

import useGetUser from "hooks/useGetUser";

const UserPage = () => {
  let { id } = useParams();
  id = Number(id);

  const user = useGetUser(id);

  return (
    <div>
      <h1>{user && user.name}</h1>
      <div className="text-left list">
        <div>
          <h2>Projects</h2>
          <UserProjects userId={id}></UserProjects>
        </div>
        <div>
          <h2>Likes</h2>
          <UserLikes userId={id} />
        </div>
        <div>
          <h2>Comments</h2>
          <UserComments userId={id}></UserComments>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
