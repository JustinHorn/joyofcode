import { gql, useMutation } from "@apollo/client";

import { comment, formatValsFromLines } from "forms";

import { getQueryVars } from "./comment/useQuery";

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

const useAddComment = (resourceId) => {
  const [mutate, { error }] = useMutation(ADDCOMMENT_MUTATION, {
    update: (cache, result, info) => {
      const { addComment: comment } = result.data;

      const comments = cache.readQuery({ ...getQueryVars(resourceId) })
        .comments;

      console.log(comment);
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
