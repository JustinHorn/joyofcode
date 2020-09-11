import React, { useState, useContext } from "react";

import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/client";

import { FeedQuery } from "component/Feed";
import MutationForm from "component/MutationForm";

const ADDResource_Mutation = gql`
  mutation addResource(
    $author: String!
    $title: String!
    $href: String!
    $tags: [String!]!
  ) {
    addResource(author: $author, title: $title, href: $href, tags: $tags) {
      id
      title
      author
      href
      date
      tags {
        name
      }
    }
  }
`;

const CreateResource = () => {
  const [mutate, { error, data }] = useMutation(ADDResource_Mutation, {
    update(cache, m_result, m_id) {
      const { addResource } = m_result.data;
      const data = cache.readQuery({ query: FeedQuery });
      const feed = data.feed;
      const new_data = {
        feed: [addResource, ...feed],
      };
      cache.writeQuery({ query: FeedQuery, data: new_data });
    },
  });

  const doMutation = ({ title, href, tags }) => {
    if (title.trim() && href.trim() && tags.trim()) {
      const variables = {
        author: "anonymous",
        href: href.trim(),
        tags: tags.trim().split(","),
        title: title.trim(),
      };
      mutate({ variables });
      return true;
    }
    return false;
  };

  return (
    <MutationForm
      doMutation={doMutation}
      headline="create"
      props={{ title: "", href: "", tags: "" }}
    ></MutationForm>
  );
};

export default CreateResource;
