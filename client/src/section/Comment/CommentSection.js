import React, { useState, useEffect } from "react";

import styles from "./commentsection.module.css";

import Comment from "component/Comment";

import useAddComment from "hooks/comment/useAddCommen";

import useQueryComments from "hooks/comment/useQuery";

import useRemoveComment from "hooks/comment/useRemove";

const CommentSection = ({ projectId }) => {
  const [text, setText] = useState("");

  const { loadComments, data, called, loading } = useQueryComments(projectId);

  const { sendComment } = useAddComment(projectId);

  const { getRemove: getRemoveComment } = useRemoveComment(projectId);

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div styles={styles.section}>
      <div className="list row-gap-10">
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
    <div className={styles.height}>
      <div className={"list row-gap-10 "}>
        {comments.map((content, index) => (
          <Comment
            key={content.id}
            {...content}
            remove={getRemoveComment(content.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
