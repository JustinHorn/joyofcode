import { gql, useLazyQuery } from "@apollo/client";

import { comment } from "forms";

const QUERY_COMMENTS = gql`
  query QUERY_COMMENTS($resourceId:Int! $orderBy:CommentOrderByInput) {
    comments(resourceId:$resourceId orderBy:$orderBy) {
      ${comment}
    }
  }
`;
export const getQueryVars = (id) => ({
  query: QUERY_COMMENTS,
  variables: { resourceId: id, orderBy: { date: "desc" } },
});

const useQueryComments = (resourceId) => {
  const queryVars = getQueryVars(resourceId);
  const [loadComments, { data, loading, called }] = useLazyQuery(
    queryVars.query,
    {
      variables: queryVars.variables,
    }
  );
  return { loadComments, data, called, loading };
};

export default useQueryComments;
