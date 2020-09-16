import React, { useState, useContext, useEffect } from "react";

import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/client";

import { FeedQueryAndVars } from "component/Feed";
import {
  MutationFormWithoutState,
  useProps,
  MutationOptions,
} from "component/MutationForm";

import { resourceQuery } from "gql";

import Resource from "component/Resource";

import styles from "./create.module.css";

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

const getImage_MUTATION = gql`
  mutation GetImage_MUTATION($href: String!) {
    makePictureOfWebsite(href: $href)
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

  const [getImage, { error: imageError, data: imageData }] = useMutation(
    getImage_MUTATION
  );

  const options = {
    title: "rq",
    tags: "rq",
    href: "rq",
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

  const props = useProps(MO.nullyfy(), doMutation);

  useEffect(() => {
    if (imageData) {
      const new_state = { ...props.stateProps };
      new_state.imgUrl = imageData.makePictureOfWebsite;
      props.setProps(new_state);
    }
  }, [imageData]);

  const preview = () => {
    getImage({ variables: { href: props.stateProps.href } });
  };

  return (
    <div className={styles.create}>
      <h2>Share your Project</h2>
      <div className="edit">
        <button onClick={preview}> previewImage</button>
        <MutationFormWithoutState headline="create" {...props} />
      </div>
      <div className="preview">
        <Resource
          {...props.stateProps}
          imgUrl={props.stateProps.imgUrl}
          tags={props.stateProps.tags.split(",").map((n) => ({ name: n }))}
          date={Date.now()}
        />
      </div>
    </div>
  );
};

export default CreateResource;
