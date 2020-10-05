import React, { useContext } from "react";

import UserContext from "context";

import PostInfoGeneral from "../General";
import ProjectLayoutContext from "context/ProjectLayout";

import styles from "./postinfoproject.module.css";

const PostInfoProject = ({ postedBy, date }) => {
  const { projectByCurrentUser } = useContext(UserContext);

  const posterName = projectByCurrentUser(postedBy.id) ? "you" : postedBy?.name;

  const { small } = useContext(ProjectLayoutContext);

  return (
    <div className={small ? styles.small : ""}>
      <PostInfoGeneral
        prefix="by"
        link={"/user/" + postedBy.id}
        linkText={posterName}
        date={date}
      />
    </div>
  );
};

export default PostInfoProject;
