import React, { useState, useEffect } from "react";

import styles from "./commentsection.module.css";

import Comment from "component/Comment";

import Spoiler from "component/Spoiler";

import useAddComment from "hooks/useAddComment";

import useQueryComments from "hooks/useQueryComments";

import useRemoveComment from "hooks/useRemoveComment";

const CommentSection = ({ resourceId, commentCount }) => {
  const [text, setText] = useState("");

  const { loadComments, data, called, loading } = useQueryComments(resourceId);

  const { sendComment } = useAddComment(resourceId);

  const { getRemove: getRemoveComment } = useRemoveComment(resourceId);

  const [show, setShow] = useState(false);

  useEffect(() => {
    show && !called && loadComments();
  }, [show]);

  const onClick = () => setShow(!show);

  return (
    <div>
      <h3>Comments: {(data && data?.comments.length) || commentCount}</h3>

      <Spoiler show={show} onClick={onClick}>
        <div className={styles.writeComment}>
          <h4>Comment:</h4>
          <textarea
            name="comment"
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
      </Spoiler>
    </div>
  );
};

const CommentList = ({ comments, getRemoveComment }) => {
  useEffect(() => {
    console.log("comments");
    console.log(comments[0]);
  }, [comments]);

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
