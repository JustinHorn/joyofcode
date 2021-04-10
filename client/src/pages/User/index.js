import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import UserProjects from "component/User/Projects";
import { useLocation, useHistory } from "react-router-dom";

import useQueryProject from "hooks/user/useQueryProjects";

import useGetUser from "hooks/useGetUser";

import styles from "./userpage.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectLayoutContext from "context/ProjectLayout";
import useLinedCached from "hooks/useLinedCached";

const UserPage = () => {
  let { id } = useParams();
  id = Number(id);

  const user = useGetUser(id);

  const queryProps = useQueryProject({
    userId: id,
    take: 6,
  });

  const displayedTake = Math.min(queryProps.take, user?.projectCount);

  const [lined, setLined] = useLinedCached(true);
  return (
    <div className={""}>
      <h1>Projects of {user?.name}</h1>

      <div className="text-left list">
        <div>
          <div className={styles.projectBar}>
            <h2>
              {displayedTake} of {user?.projectCount} Projects
            </h2>
            <span>
              <button
                className={
                  (lined ? "selected" : "not-selected") + " iconButton"
                }
                onClick={() => setLined(true)}
              >
                <FontAwesomeIcon icon={["fas", "bars"]}> h</FontAwesomeIcon>
              </button>
              <button
                className={
                  (lined ? "not-selected" : "selected") + " iconButton"
                }
                onClick={() => setLined(false)}
              >
                <FontAwesomeIcon icon={["fas", "th"]}> h</FontAwesomeIcon>
              </button>
            </span>
          </div>
          <ProjectLayoutContext.Provider value={{ lined }}>
            <UserProjects userId={id} queryProps={queryProps} />
          </ProjectLayoutContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
