import { useState } from "react";

import { useQuery, gql } from "@apollo/client";

export const userLikeQuery = gql`
  query userLikes($id: Int!, $take: Int, $orderBy: LikesOrderByInput) {
    userLikes(id: $id, take: $take, orderBy: $orderBy) {
      id
      date
      project {
        id
        title
      }
    }
  }
`;

const useQueryLikes = (props) => {
  const { userId, take: propsTake } = props;
  const [take, setTake] = useState(propsTake || 20);

  const { data, loading, error, fetchMore } = useQuery(userLikeQuery, {
    variables: { id: userId, take, orderBy: { date: "desc" } },
  });

  const addItems = () => {
    fetchMore({
      variables: { take: take + 3, skip: take },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setTake(take + 3);

        return Object.assign({}, prev, {
          userLikes: [...fetchMoreResult.userLikes],
        });
      },
    });
  };

  return { list: data?.userLikes, data, loading, error, addItems };
};

export default useQueryLikes;
