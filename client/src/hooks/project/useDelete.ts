import React, { useEffect } from "react";

import { useMutation, gql } from "@apollo/client";

import { readFeed, writeFeed } from "../helper";

const MUTATION_DELETE = gql`
  mutation MUTATION_DELETE($id: Int!) {
    deleteProject(id: $id) {
      id
      title
    }
  }
`;

type useDeleteProjectReturn = {
  deleteProject: (obj: { variables: { id: number } }) => any;
  error: any;
  called: boolean;
};

const useDeleteProject = (props: any): useDeleteProjectReturn => {
  const [deleteProject, { error, called }] = useMutation(MUTATION_DELETE, {
    update(cache: any, m_result: any, m_id: any) {
      const { deleteProject } = m_result.data;
      const feed = readFeed(cache);

      const index = feed.findIndex((x: any) => x.id === deleteProject.id);
      const new_data = {
        feed: [...feed.slice(0, index), ...feed.slice(index + 1)],
      };
      writeFeed(cache, new_data);
    },
    ...props,
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  return { deleteProject, error, called };
};

export default useDeleteProject;
