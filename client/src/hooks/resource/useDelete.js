import React, { useEffect } from "react";

import { useMutation ,gql} from "@apollo/client";

import { readFeed, writeFeed } from "../helper";

const MUTATION_DELETE = gql`
  mutation MUTATION_DELETE($id: Int!) {
    deleteResource(id: $id) {
      id
      title
    }
  }
`;

const useDeleteResource = (props) => {
  const [deleteResource, { error, called }] = useMutation(MUTATION_DELETE, {
    update(cache, m_result, m_id) {
      const { deleteResource } = m_result.data;
      const feed = readFeed(cache);

      const index = feed.findIndex((x) => x.id === deleteResource.id);
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
  return { deleteResource, error, called };
};

export default useDeleteResource;
