import React, { useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";

import { comment, formatValsFromLines } from "forms";

import styles from "./commentsection.module.css";

import Comment from "component/Comment";

import Spoiler from "component/Spoiler";

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

  const queryVars = {
    query: QUERY_COMMENTS,
    variables: { resourceId, orderBy: { date: "desc" } },
  };

  const [mutate, { error }] = useMutation(ADDCOMMENT_MUTATION, {
    update: (cache, result, info) => {
      const { addComment: comment } = result.data;

      const comments = cache.readQuery({ ...queryVars }).comments;

      const new_comments = [comment, ...comments];

      cache.writeQuery({ ...queryVars, data: { comments: new_comments } });
    },
  });

  const writeComment = () => {
    mutate({ variables: { resourceId, text } });
  };

  const { data, loading } = useQuery(queryVars.query, {
    variables: queryVars.variables,
  });

  if (loading) return "loading";

  return (
    <div>
      <h3>Comments: {data?.comments.length}</h3>

      <Spoiler>
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
          {data?.comments.map((content, index) => (
            <Comment key={index} {...content}></Comment>
          ))}
        </div>
      </Spoiler>
    </div>
  );
};

export default CommentSection;
