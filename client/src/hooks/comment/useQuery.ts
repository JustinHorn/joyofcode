import { gql, useLazyQuery } from "@apollo/client";

import { comment } from "forms";

const QUERY_COMMENTS = gql`
  query QUERY_COMMENTS($projectId:Int! $orderBy:CommentOrderByInput) {
    comments(projectId:$projectId orderBy:$orderBy) {
      ${comment}
    }
  }
`;
export const getQueryVars = (id:number) => ({
  query: QUERY_COMMENTS,
  variables: { projectId: id, orderBy: { date: "desc" } },
});

const useQueryComments = (projectId:number) => {
  const queryVars = getQueryVars(projectId);
  const [loadComments, { data, loading, called }] = useLazyQuery(
    queryVars.query,
    {
      variables: queryVars.variables,
    }
  );
  return { loadComments, data, called, loading };
};

export default useQueryComments;
