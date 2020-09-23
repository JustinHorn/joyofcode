import React, { useEffect } from "react";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

import { FeedQueryAndVars } from "component/Feed";

const MUTATION_DELETE = gql`
  mutation MUTATION_DELETE($id: Int!) {
    deleteResource(id: $id) {
      id
      title
    }
  }
`;

const DeleteResource = ({ id }) => {
  const [mutate, { error }] = useMutation(MUTATION_DELETE, {
    update(cache, m_result, m_id) {
      const { deleteResource } = m_result.data;

      const data = cache.readQuery({ ...FeedQueryAndVars });

      const feed = data.feed;

      const index = feed.findIndex((x) => x.id === deleteResource.id);
      const new_data = {
        feed: [...feed.slice(0, index), ...feed.slice(index + 1)],
      };
      cache.writeQuery({ ...FeedQueryAndVars, data: new_data });
    },
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const deleteResource = (id) => {
    if (window.confirm("You really wanna delete?")) {
      mutate({ variables: { id } });
    }
  };

  return <button onClick={() => deleteResource(id)}>Delete</button>;
};

export default DeleteResource;
