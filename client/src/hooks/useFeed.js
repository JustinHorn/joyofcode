import { useQuery, gql } from "@apollo/client";

import { projectQuery } from "forms";

//move this out

export const FeedQuery = gql`
  query getFeed($take:Int,$orderBy: ProjectOrderByInput) {
    feed(take:$take,orderBy: $orderBy) {
      ${projectQuery}
    }
  }
`;

export const FeedQueryAndVars = {
  query: FeedQuery,
  variables: { take: 10, orderBy: { date: "desc" } },
};

const useFeed = () => {
  const { data, loading, error } = useQuery(FeedQueryAndVars.query, {
    variables: FeedQueryAndVars.variables,
  });

  return { data, loading, error };
};

export default useFeed;
