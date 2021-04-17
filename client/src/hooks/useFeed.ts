import { useEffect, useState } from "react";

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

type useFeedProps = {
  take: number;
};

type useFeedReturn = {
  data: {
    feed: Project[];
  };
  loading: boolean;
  old_loading: boolean;
  error: any;
  addItems: () => void;
  take: number;
};

const useFeed: (props?: useFeedProps) => useFeedReturn = (
  props = { take: 6 }
) => {
  const [take, setTake] = useState(props.take);

  const { data, loading, error, fetchMore } = useQuery(FeedQueryAndVars.query, {
    variables: FeedQueryAndVars.variables,
  });

  // loading does not seem to get updated on fetch more
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const real_loading = loading || isLoading;

  const addItems = () => {
    if (!real_loading) {
      setIsLoading(true);
      fetchMore({
        variables: { take: take + 3, skip: take },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          setIsLoading(false);

          if (!fetchMoreResult) return prev;
          setTake(take + 3);

          return Object.assign({}, prev, {
            feed: [...fetchMoreResult.feed],
          });
        },
      });
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      alert(error);
    }
  }, [error]);

  console.log(data);

  return {
    data,
    loading: real_loading,
    old_loading: loading,
    error,
    addItems,
    take,
  };
};

export default useFeed;
