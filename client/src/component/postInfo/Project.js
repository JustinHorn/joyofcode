import React, { useContext } from "react";

import UserContext from "context";

import PostInfoGeneral from "./General";

const PostInfoProject = ({ postedBy, date }) => {
  const { projectByCurrentUser } = useContext(UserContext);

  const posterName = projectByCurrentUser(postedBy.id) ? "you" : postedBy?.name;

  return (
    <PostInfoGeneral
      prefix="by"
      link={"/user/" + postedBy.id}
      linkText={posterName}
      date={date}
    />
  );
};

export default PostInfoProject;
