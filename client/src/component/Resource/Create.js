import React, { useState, useContext } from "react";

import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/client";

import { FeedQueryAndVars } from "component/Feed";
import MutationForm from "component/MutationForm";

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
      id
      title
      imgUrl
      postedBy {
        name
      }
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

  const doMutation = ({ title, href, tags, imgUrl, github }) => {
    if (title.trim() && href.trim() && tags.trim()) {
      const variables = {
        href: href.trim(),
        tags: tags.trim().split(","),
        title: title.trim(),
        imgUrl,
        github,
      };
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
        props={{ title: "", href: "", tags: "", imgUrl: "", github: "" }}
      ></MutationForm>
    </>
  );
};

export default CreateResource;
