import React, { useState } from "react";

import styles from "./feed.module.css";

import { ResourceFilter } from "component/Resource";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";

export const FeedQuery = gql`
  query GETFEED($orderBy: ResourceOrderByInput) {
    feed(orderBy: $orderBy) {
      id
      title
      href
      date
      tags {
        name
      }
      postedBy {
        id
        name
      }
    }
  }
`;

const Feed = () => {
  const { data, loading, error } = useQuery(FeedQuery, {
    variables: { orderBy: { date: "desc" } },
  });

  if (error) {
    console.log(error);
    throw error;
  }
  if (loading) return "loading";

  return (
    <div className={styles.feed}>
      <ResourceFilter resources={data?.feed}></ResourceFilter>
    </div>
  );
};

export default Feed;
