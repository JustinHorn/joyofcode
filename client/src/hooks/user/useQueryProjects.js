import { useState } from "react";

import { projectQuery } from "forms";
import { useQuery, gql } from "@apollo/client";

export const userProjectsQuery = gql`
  query userProjects($id:Int!,$take:Int,$orderBy: ProjectOrderByInput) {
    userProjects(id:$id,take:$take,orderBy: $orderBy) {
      ...ProjectQuery
    }
  }

  fragment ProjectQuery on Project {
    ${projectQuery}
  }
`;

const useQueryProjects = (props) => {
  const { userId, take: propsTake } = props;
  const [take, setTake] = useState(propsTake || 10);
  const { data, loading, error, fetchMore } = useQuery(userProjectsQuery, {
    variables: { id: userId, take, orderBy: { date: "desc" } },
  });

  const addItems = () => {
    fetchMore({
      variables: { take: take + 3, skip: take },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setTake(take + 3);

        return Object.assign({}, prev, {
          userProjects: [...fetchMoreResult.userProjects],
        });
      },
    });
  };
  return { list: data?.userProjects, data, loading, error, addItems };
};

export default useQueryProjects;
