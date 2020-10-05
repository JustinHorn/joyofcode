import { useQuery, gql } from "@apollo/client";

import { comment } from "forms";

export const userCommentsQuery = gql`
  query userComments($id: Int!, $take: Int, $orderBy: CommentOrderByInput) {
    userComments(id: $id, take: $take, orderBy: $orderBy) {
      ${comment}
      postedUnder {
        id
        title
      }
    }
  }
`;

const useQueryComments = ({ userId }) => {
  const { data, loading, error } = useQuery(userCommentsQuery, {
    variables: { id: userId, take: 10, orderBy: { date: "desc" } },
  });

  return { data, loading, error };
};

export default useQueryComments;
