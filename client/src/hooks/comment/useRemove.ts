import { gql, useMutation } from "@apollo/client";

import { getQueryVars } from "hooks/comment/useQuery";

const REMOVE_COMMENT_MUTATION = gql`
  mutation removeComment($commentId: Int!) {
    removeComment(commentId: $commentId)
  }
`;

type useRemoveCommentProps = number;
type useRemoveCommentReturn = { getRemove: (id: number) => () => void };

const useRemoveComment = (
  projectId: useRemoveCommentProps
): useRemoveCommentReturn => {
  const a: any = {};
  const [removeComment, { error }] = useMutation(REMOVE_COMMENT_MUTATION, {
    update(cache: any, result: any, info: any) {
      const { removeComment: id } = result.data;

      const comments = cache.readQuery({ ...getQueryVars(projectId) }).comments;

      const index = comments.findIndex((c: Comment) => c.id === id);
      const new_comments = [
        ...comments.slice(0, index),
        ...comments.slice(index + 1),
      ];
      cache.writeQuery({
        ...getQueryVars(projectId),
        data: { comments: new_comments },
      });
    },
    ...a,
  });

  const getRemove = (id: number) => () => {
    removeComment({ variables: { commentId: id } });
  };
  return { getRemove };
};

export default useRemoveComment;
