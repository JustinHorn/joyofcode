import { useQuery, gql } from "@apollo/client";

import { projectQuery, comment } from "forms";

const QUERY_PROJECT = gql`
  query QUERY_PROJECT($id:Int!) {
      project(id:$id) {
          ${projectQuery}
          comments {
            ${comment}
          }
      }
  }
`;

const useProject = (id:number) => {
  const { loading, data, error } = useQuery(QUERY_PROJECT, {
    variables: { id },
  });

  return { loading, data, error };
};

export default useProject;
