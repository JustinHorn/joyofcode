import React, { useState } from "react";
import MutationForm, { MutationOptions } from "component/MutationForm";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

import { FeedQueryAndVars } from "component/Feed";
import { resourceQuery } from "gql";

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
      ${resourceQuery}
    }
  }
`;

const UpdateResource = ({ id, afterUpdate }) => {
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

  const options = {
    title: "rq",
    tags: "rq",
    imgUrl: "",
    github: "",
  };

  const MO = new MutationOptions(options);

  const doUpdateMutation = (props) => {
    const variables = MO.formatVars(props);
    variables.tags = variables.tags?.split(",");
    variables.id = id;
    update({ variables });
    afterUpdate();
    return true;
  };

  return (
    <MutationForm
      doMutation={doUpdateMutation}
      headline={"update"}
      props={MO.nullyfy()}
    />
  );
};

export default UpdateResource;
