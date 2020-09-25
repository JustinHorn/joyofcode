import React, { useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";

import { comment, formatValsFromLines } from "forms";

import styles from "./commentsection.module.css";

import Comment from "component/Comment";

const values = `$resourceId:Int! 
$text:String!`;

const ADDCOMMENT_MUTATION = gql`
mutation ADDCOMMENT_MUTATION(
  ${values}
) {
  addComment(
    ${formatValsFromLines(values)}
  ) {
    ${comment}
  }
}`;

const QUERY_COMMENTS = gql`
  query QUERY_COMMENTS($resourceId:Int! $orderBy:CommentOrderByInput) {
    comments(resourceId:$resourceId orderBy:$orderBy) {
      ${comment}
    }
  }
`;

const CommentSection = ({ resourceId }) => {
  const [text, setText] = useState("");

  const [mutate, { error }] = useMutation(ADDCOMMENT_MUTATION);

  const writeComment = () => {
    mutate({ variables: { resourceId, text } });
  };

  const { data, loading } = useQuery(QUERY_COMMENTS, {
    variables: { resourceId, orderBy: { date: "desc" } },
  });

  if (loading) return "loading";

  return (
    <div>
      <h3>Comments: {data?.comments.length}</h3>
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
        <button onClick={writeComment}>Comment</button>
      </div>
      <div className={styles.comments}>
        {data?.comments.map((content) => (
          <Comment {...content}></Comment>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
