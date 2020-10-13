import React from "react";
import { useParams } from "react-router-dom";

import UserProjects from "component/User/Projects";

import useQueryProject from "hooks/user/useQueryProjects";

import useGetUser from "hooks/useGetUser";

import ToggleSmallNormal from "component/ToggleLinedCached";

import styles from "./userpage.module.css";

const UserPage = () => {
  let { id } = useParams();
  id = Number(id);

  const user = useGetUser(id);

  const queryProps = useQueryProject({
    userId: id,
    take: 6,
  });

  const displayedTake = Math.min(queryProps.take, user?.projectCount);

  return (
    <div className={styles.userpage}>
      <h1>Projects of {user?.name}</h1>

      <div className="text-left list">
        <div>
          <h2>
            {displayedTake} of {user?.projectCount} Projects
          </h2>
          <ToggleSmallNormal initLined={true}>
            <UserProjects userId={id} queryProps={queryProps} />
          </ToggleSmallNormal>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
