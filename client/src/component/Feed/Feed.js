import React from "react";

import styles from "./feed.module.css";

import { ResourceFilter } from "component/Resource";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";

import { resourceQuery } from "gql";

export const FeedQuery = gql`
  query getFeed($orderBy: ResourceOrderByInput) {
    feed(orderBy: $orderBy) {
      ${resourceQuery}
    }
  }
`;

export const FeedQueryAndVars = {
  query: FeedQuery,
  variables: { orderBy: { date: "desc" } },
};

const Feed = () => {
  const { data, loading, error } = useQuery(FeedQueryAndVars.query, {
    variables: FeedQueryAndVars.variables,
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
