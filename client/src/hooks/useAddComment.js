import { gql, useMutation, useQuery } from "@apollo/client";

import { comment, formatValsFromLines } from "forms";

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

const getQueryVars = (id) => ({
  query: QUERY_COMMENTS,
  variables: { resourceId: id, orderBy: { date: "desc" } },
});

const useAddComment = (resourceId) => {
  const [mutate, { error }] = useMutation(ADDCOMMENT_MUTATION, {
    update: (cache, result, info) => {
      const { addComment: comment } = result.data;

      const comments = cache.readQuery({ ...getQueryVars(resourceId) })
        .comments;

      const new_comments = [comment, ...comments];

      cache.writeQuery({
        ...getQueryVars(resourceId),
        data: { comments: new_comments },
      });
    },
  });

  const sendComment = (text) => {
    mutate({ variables: { resourceId, text } });
  };

  return { sendComment };
};

export default useAddComment;
