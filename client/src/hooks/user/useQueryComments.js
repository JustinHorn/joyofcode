import { useState } from "react";

import { useQuery, gql } from "@apollo/client";

import { comment } from "forms";

export const userCommentsQuery = gql`
  query userComments($id: Int!, $take: Int, $orderBy: CommentOrderByInput) {
    userComments(id: $id, take: $take, orderBy: $orderBy) {
      ${comment}
      postedUnder {
        id
        title
      }
    }
  }
`;

const useQueryComments = (props) => {
  const { userId, take: propsTake } = props;
  const [take, setTake] = useState(propsTake || 10);

  const { data, loading, error, fetchMore } = useQuery(userCommentsQuery, {
    variables: { id: userId, take, orderBy: { date: "desc" } },
  });

  const addItems = () => {
    fetchMore({
      variables: { take: take + 3, skip: take },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setTake(take + 3);

        return Object.assign({}, prev, {
          userComments: [...fetchMoreResult.userComments],
        });
      },
    });
  };

  return { data, list: data?.userComments, loading, error, addItems, take };
};

export default useQueryComments;
