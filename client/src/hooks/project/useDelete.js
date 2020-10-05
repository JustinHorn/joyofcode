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

const useDeleteProject = (props) => {
  const [deleteProject, { error, called }] = useMutation(MUTATION_DELETE, {
    update(cache, m_result, m_id) {
      const { deleteProject } = m_result.data;
      const feed = readFeed(cache);

      const index = feed.findIndex((x) => x.id === deleteProject.id);
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
