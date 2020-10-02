import React from "react";
import PostInfoComment from "component/postInfo/Comment";

import Comment from "component/Comment";

const UserComment = (props) => {
  return (
    <div className="text-left">
      <Comment {...props} />
      <PostInfoComment {...props} />
    </div>
  );
};

export default UserComment;
