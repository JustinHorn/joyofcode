import { gql, useMutation } from "@apollo/client";

import { getQueryVars } from "hooks/comment/useQuery";

const REMOVE_COMMENT_MUTATION = gql`
  mutation removeComment($commentId: Int!) {
    removeComment(commentId: $commentId)
  }
`;

const useRemoveComment = (resourceId) => {
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
  return { getRemove };
};

export default useRemoveComment;
