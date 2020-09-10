import React, { useState } from "react";

import styles from "./feed.module.css";

import { ResourceFilter } from "component/Resource";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";

export const FeedQuery = gql`
  query {
    feed {
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

const Feed = () => {
  const { data, loading, error } = useQuery(FeedQuery);

  if (error) {
    console.log(error);
    return "error";
  }
  if (loading) return "loading";

  return (
    <div className={styles.feed}>
      <ResourceFilter resources={data?.feed}></ResourceFilter>
    </div>
  );
};

export default Feed;
