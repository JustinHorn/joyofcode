import React, { useState, useContext, useEffect } from "react";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

import { FeedQueryAndVars } from "component/Feed";
import {
  MutationFormWithoutState,
  useProps,
  MutationOptions,
} from "component/MutationForm";

import { resourceQuery } from "gql";

import Resource from "component/Resource";

import styles from "./create.module.css";

import { useGetImageMutation } from "hooks";

import { createOptions as options } from "component/MutationForm";

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

  const props = useProps(MO.options, doMutation);

  const setImage = (url) => {
    props.setProp("imgUrl", url);
  };

  const preview = useGetImageMutation(setImage);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const resourceProps = {};

  Object.keys(props.stateProps).forEach(
    (k) => (resourceProps[k] = props.stateProps[k].value)
  );

  return (
    <div className={styles.create}>
      <h2>Share your Project</h2>
      <div className="edit">
        <button onClick={() => preview(props.stateProps.href.value)}>
          generate Image from href
        </button>{" "}
        (takes a few seconds)
        <MutationFormWithoutState headline="create" {...props} />
      </div>
      <div className="preview">
        <h4>Preview:</h4>
        <Resource
          {...resourceProps}
          imgUrl={props.stateProps.imgUrl}
          tags={props.stateProps.tags.value
            .split(",")
            .map((n) => ({ name: n }))}
          date={Date.now()}
        />
      </div>
    </div>
  );
};

export default CreateResource;
