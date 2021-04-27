import { gql, useMutation } from "@apollo/client";

import { comment, formatValsFromLines } from "forms";

import { getQueryVars } from "./useQuery";

const values = `$projectId:Int! 
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

const useAddComment = (
  projectId: number
): { sendComment: (text: string) => void } => {
  const a: any = {};
  const [mutate, { error }] = useMutation(ADDCOMMENT_MUTATION, {
    update: (cache: any, result: any, info: any) => {
      const { addComment: comment } = result.data;

      const comments = cache.readQuery({ ...getQueryVars(projectId) }).comments;

      console.log(comment);
      const new_comments = [comment, ...comments];

      cache.writeQuery({
        ...getQueryVars(projectId),
        data: { comments: new_comments },
      });
    },
    ...a,
  });

  const sendComment = (text: string) => {
    mutate({ variables: { projectId, text } });
  };

  return { sendComment };
};

export default useAddComment;
