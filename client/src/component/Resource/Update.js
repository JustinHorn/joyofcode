import React, { useState } from "react";
import MutationForm from "component/MutationForm";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

import { FeedQuery } from "component/Feed";

const MUTATION_UPDATE = gql`
  mutation updateResource($id: Int!, $title: String, $tags: [String!]) {
    updateResource(id: $id, title: $title, tags: $tags) {
      id
      title
      href
      author
      date
      tags {
        id
        name
      }
    }
  }
`;

const UpdateResource = ({ id }) => {
  const [update, other] = useMutation(MUTATION_UPDATE, {
    update(cache, m_result, m_id) {
      const { updateResource } = m_result.data;
      const data = cache.readQuery({ query: FeedQuery });
      const feed = data.feed;

      const index = feed.findIndex((x) => x.id === updateResource.id);
      const new_data = {
        feed: [
          ...feed.slice(0, index),
          updateResource,
          ...feed.slice(index + 1),
        ],
      };
      cache.writeQuery({ query: FeedQuery, data: new_data });
    },
  });

  const doUpdateMutation = ({ title, tags }) => {
    const variables = {
      id,
      title: title ? title.trim() : undefined,
      tags: tags.length ? tags.split(",") : undefined,
    };
    update({ variables });
    return true;
  };

  return (
    <MutationForm
      doMutation={doUpdateMutation}
      headline={"update"}
      props={{ title: "", tags: "" }}
    ></MutationForm>
  );
};

export default UpdateResource;
