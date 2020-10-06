import React, { useContext } from "react";

import UserContext from "context";

import PostInfoGeneral from "../General";
import ProjectLayoutContext from "context/ProjectLayout";

import styles from "./postinfoproject.module.css";

import { useLocation } from "react-router-dom";

const PostInfoProject = ({ postedBy, date }) => {
  const location = useLocation();

  const userPage = location.pathname.includes("/user/");

  const { projectByCurrentUser } = useContext(UserContext);

  const posterName = projectByCurrentUser(postedBy.id) ? "you" : postedBy?.name;

  const { lined } = useContext(ProjectLayoutContext);

  return (
    <div className={lined ? styles.lined : ""}>
      <PostInfoGeneral
        {...(userPage
          ? {}
          : {
              prefix: "by",
              link: "/user/" + postedBy.id,
              linkText: posterName,
            })}
        date={date}
      />
    </div>
  );
};

export default PostInfoProject;
