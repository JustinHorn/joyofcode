import React, { useEffect } from "react";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

import { readFeed, writeFeed } from "./helper";

const MUTATION_DELETE = gql`
  mutation MUTATION_DELETE($id: Int!) {
    deleteResource(id: $id) {
      id
      title
    }
  }
`;

const useDeleteResource = () => {
  const [deleteResource, { error }] = useMutation(MUTATION_DELETE, {
    update(cache, m_result, m_id) {
      const { deleteResource } = m_result.data;
      const feed = readFeed(cache);

      const index = feed.findIndex((x) => x.id === deleteResource.id);
      const new_data = {
        feed: [...feed.slice(0, index), ...feed.slice(index + 1)],
      };
      writeFeed(cache, new_data);
    },
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  return { deleteResource };
};

export default useDeleteResource;
