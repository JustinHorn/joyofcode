import React, { useState, useEffect } from "react";

import styles from "./commentsection.module.css";

import Comment from "component/Comment";

import Spoiler from "component/Spoiler";

import useAddComment from "hooks/useAddComment";

import useQueryComments from "hooks/useQueryComments";
import { gql, useMutation } from "@apollo/client";

import { getQueryVars } from "hooks/useQueryComments";

const REMOVE_COMMENT_MUTATION = gql`
  mutation removeComment($commentId: Int!) {
    removeComment(commentId: $commentId)
  }
`;

const CommentSection = ({ resourceId, commentCount }) => {
  const [text, setText] = useState("");

  const { loadComments, data, called, loading } = useQueryComments(resourceId);

  const { sendComment } = useAddComment(resourceId);

  const [show, setShow] = useState(false);

  useEffect(() => {
    show && !called && loadComments();
  }, [show]);

  const onClick = () => setShow(!show);

  const [removeComment, { error }] = useMutation(REMOVE_COMMENT_MUTATION, {
    update: (cache, result, info) => {
      const { removeComment: id } = result.data;

      const comments = cache.readQuery({ ...getQueryVars(resourceId) })
        .comments;

      const index = comments.findIndex((c) => c.id === id);
      const new_comments = [
        ...comments.slice(0, index),
        ...comments.slice(index + 1),
      ];
      cache.writeQuery({
        ...getQueryVars(resourceId),
        data: { comments: new_comments },
      });
    },
  });

  const getRemove = (id) => () => {
    removeComment({ variables: { commentId: id } });
  };

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

        <div className={styles.comments}>
          {data?.comments.map((content, index) => (
            <Comment
              key={index}
              {...content}
              remove={getRemove(content.id)}
            ></Comment>
          ))}
        </div>
      </Spoiler>
    </div>
  );
};

export default CommentSection;
