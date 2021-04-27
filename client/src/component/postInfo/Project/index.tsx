import React, { useContext } from "react";

import UserContext from "context/UserContext";

import PostInfoGeneral from "../General";
import ProjectLayoutContext from "context/ProjectLayout";

import styles from "./postinfoproject.module.css";

import { useLocation } from "react-router-dom";

type PostInfoProjectProps = {
  postedBy: User;
  date: number;
};

const PostInfoProject = ({ postedBy, date }: PostInfoProjectProps) => {
  const location = useLocation();

  const userPage = location.pathname.includes("/user/");

  const { isCurrentUser } = useContext(UserContext);

  const posterName = isCurrentUser(postedBy.id) ? "you" : postedBy?.name;

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
