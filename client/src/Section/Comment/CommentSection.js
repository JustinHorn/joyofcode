import React, { useState, useEffect } from "react";

import styles from "./commentsection.module.css";

import Comment from "component/Comment";

import Spoiler from "component/Spoiler";

import useAddComment from "hooks/useAddComment";

import useQueryComments from "hooks/useQueryComments";

import useRemoveComment from "hooks/useRemoveComment";

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
      <div className={styles.writeComment}>
        <textarea
          name="comment"
          placeholder="Comment"
          id=""
          cols="30"
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => sendComment(text)}>Comment</button>
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
    <div className={styles.comments}>
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
