import { useState } from "react";

import { useQuery, gql } from "@apollo/client";

import { projectQuery } from "forms";

export const FeedQuery = gql`
  query getFeed($take:Int,$orderBy: ProjectOrderByInput) {
    feed(take:$take,orderBy: $orderBy) {
      ${projectQuery}
    }
  }
`;

export const FeedQueryAndVars = {
  query: FeedQuery,
  variables: { take: 6, orderBy: { date: "desc" } },
};

const useFeed = (props = {}) => {
  const [take, setTake] = useState(props.take || 6);

  const { data, loading, error, fetchMore } = useQuery(FeedQueryAndVars.query, {
    variables: FeedQueryAndVars.variables,
  });

  const addItems = () => {
    fetchMore({
      variables: { take: take + 3, skip: take },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setTake(take + 3);

        return Object.assign({}, prev, {
          feed: [...fetchMoreResult.feed],
        });
      },
    });
  };

  return { data, loading, error, addItems };
};

export default useFeed;
