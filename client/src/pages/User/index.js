import React from "react";
import { useParams } from "react-router-dom";

import UserProjects from "component/User/Projects";

import UserComments from "component/User/Comments";

import UserLikes from "component/User/Likes";

import useGetUser from "hooks/useGetUser";

import ToggleSmallNormal from "component/ToggleLinedCached";

import styles from "./userpage.module.css";

const UserPage = () => {
  let { id } = useParams();
  id = Number(id);

  const user = useGetUser(id);

  return (
    <div className={styles.userpage}>
      <h1>Activity of {user?.name}</h1>
      <div className="text-left list">
        <div>
          <h2>Projects {user?.projectCount}</h2>
          <ToggleSmallNormal initLined={true}>
            <UserProjects userId={id} />
          </ToggleSmallNormal>
        </div>
        <div>
          <h2>Likes {user?.likeCount}</h2>
          <UserLikes userId={id} />
        </div>
        <div>
          <h2>Comments {user?.commentCount}</h2>
          <UserComments userId={id}></UserComments>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
