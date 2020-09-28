import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";

import { resourceQuery } from "forms";

//move this out

export const FeedQuery = gql`
  query getFeed($take:Int,$orderBy: ResourceOrderByInput) {
    feed(take:$take,orderBy: $orderBy) {
      ${resourceQuery}
    }
  }
`;

export const FeedQueryAndVars = {
  query: FeedQuery,
  variables: { take: 1, orderBy: { date: "desc" } },
};

const useFeed = () => {
  const { data, loading, error } = useQuery(FeedQueryAndVars.query, {
    variables: FeedQueryAndVars.variables,
  });

  return { data, loading, error };
};

export default useFeed;
