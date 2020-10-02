import React, { useState, useEffect } from "react";

import styles from "./commentsection.module.css";

import Comment from "component/Comment";

import useAddComment from "hooks/useAddComment";

import useQueryComments from "hooks/comment/useQuery";

import useRemoveComment from "hooks/comment/useRemove";

const CommentSection = ({ resourceId }) => {
  const [text, setText] = useState("");

  const { loadComments, data, called, loading } = useQueryComments(resourceId);

  const { sendComment } = useAddComment(resourceId);

  const { getRemove: getRemoveComment } = useRemoveComment(resourceId);

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div>
      <div className="list">
        <textarea
          name="comment"
          placeholder="Comment"
          id=""
          cols="30"
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className={styles.commentbutton}
          onClick={() => sendComment(text)}
        >
          Comment
        </button>
      </div>
      {loading && "loading"}

      <CommentList
        comments={data?.comments || []}
        getRemoveComment={getRemoveComment}
      />
    </div>
  );
};

const CommentList = ({ comments, getRemoveComment }) => {
  return (
    <div className="list">
      {comments.map((content, index) => (
        <Comment
          key={content.id}
          {...content}
          remove={getRemoveComment(content.id)}
        />
      ))}
    </div>
  );
};

export default CommentSection;
