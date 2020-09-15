import React, { useState, useContext } from "react";

import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/client";

import { FeedQueryAndVars } from "component/Feed";
import MutationForm, { MutationOptions } from "component/MutationForm";

import { resourceQuery } from "gql";

const ADDResource_Mutation = gql`
  mutation addResource(
    $title: String!
    $href: String!
    $tags: [String!]!
    $imgUrl: String
    $github: String
  ) {
    addResource(
      title: $title
      href: $href
      tags: $tags
      imgUrl: $imgUrl
      github: $github
    ) {
      ${resourceQuery}
    }
  }
`;

const CreateResource = () => {
  const [mutate, { error, data }] = useMutation(ADDResource_Mutation, {
    update(cache, m_result, m_id) {
      const { addResource } = m_result.data;
      const data = cache.readQuery({
        ...FeedQueryAndVars,
      });
      const feed = data.feed;
      const new_data = {
        feed: [addResource, ...feed],
      };
      cache.writeQuery({
        ...FeedQueryAndVars,
        data: new_data,
      });
    },
  });

  const options = {
    title: "rq",
    href: "rq",
    tags: "rq",
    description: "",
    imgUrl: "",
    github: "",
  };

  const MO = new MutationOptions(options);

  const doMutation = (props) => {
    if (MO.testMatch(props)) {
      const variables = MO.formatVars(props);
      variables.tags = variables.tags.split(",");
      mutate({ variables });
      return true;
    }
    return false;
  };

  return (
    <>
      <h2>Share your Project</h2>
      <MutationForm
        doMutation={doMutation}
        headline="create"
        props={MO.nullyfy()}
      ></MutationForm>
    </>
  );
};

export default CreateResource;
