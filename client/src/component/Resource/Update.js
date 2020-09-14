import React, { useState } from "react";
import MutationForm from "component/MutationForm";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

import { FeedQueryAndVars } from "component/Feed";

const MUTATION_UPDATE = gql`
  mutation updateResource(
    $id: Int!
    $title: String
    $tags: [String!]
    $imgUrl: String
    $github: String
  ) {
    updateResource(
      id: $id
      title: $title
      tags: $tags
      imgUrl: $imgUrl
      github: $github
    ) {
      id
      title
      imgUrl
      github
      href
      date
      tags {
        id
        name
      }
      postedBy {
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
      const data = cache.readQuery({ ...FeedQueryAndVars });
      const feed = data.feed;

      const index = feed.findIndex((x) => x.id === updateResource.id);
      const new_data = {
        feed: [
          ...feed.slice(0, index),
          updateResource,
          ...feed.slice(index + 1),
        ],
      };
      cache.writeQuery({ ...FeedQueryAndVars, data: new_data });
    },
  });

  const doUpdateMutation = ({ title, tags, imgUrl, github }) => {
    const variables = {
      id,
      title: title ? title.trim() : undefined,
      tags: tags.length ? tags.split(",") : undefined,
      imgUrl: imgUrl ? imgUrl : undefined,
      github: github ? github : undefined,
    };
    update({ variables });
    return true;
  };

  return (
    <MutationForm
      doMutation={doUpdateMutation}
      headline={"update"}
      props={{ title: "", tags: "", imgUrl: "", github: "" }}
    ></MutationForm>
  );
};

export default UpdateResource;
