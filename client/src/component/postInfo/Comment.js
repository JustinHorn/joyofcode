import React from "react";

import PostInfoGeneral from "./General";

const PostInfoComment = ({ postedUnder, date }) => {
  return (
    <PostInfoGeneral
      prefix="under"
      link={"/project/" + postedUnder.id}
      linkText={postedUnder.title}
      date={date}
    />
  );
};

export default PostInfoComment;
