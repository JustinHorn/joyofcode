import { useEffect, useState } from "react";

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

type useQueryProjectsProps = {
  userId: number;
  take?: number;
};

export type useQueryProjectsReturn = {
  list: Project[];
  data: any;
  loading: boolean;
  old_loading: boolean;
  error: any;
  addItems: () => void;

  take: number;
};

const useQueryProjects = (
  props: useQueryProjectsProps
): useQueryProjectsReturn => {
  const { userId, take: propsTake } = props;
  const [take, setTake] = useState(propsTake || 10);
  const { data, loading, error, fetchMore } = useQuery(userProjectsQuery, {
    variables: { id: userId, take, orderBy: { date: "desc" } },
  });

  // loading does not seem to get updated on fetch more
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const real_loading = loading || isLoading;

  const addItems = () => {
    if (real_loading) return;
    setIsLoading(true);
    fetchMore({
      variables: { take: take + 3, skip: take },
      updateQuery: (prev, { fetchMoreResult }) => {
        setIsLoading(false);

        if (!fetchMoreResult) return prev;
        setTake(take + 3);

        return Object.assign({}, prev, {
          userProjects: [...(fetchMoreResult as any).userProjects],
        });
      },
    });
  };
  return {
    list: data?.userProjects,
    data,
    loading: real_loading,
    old_loading: loading,
    error,
    addItems,
    take,
  };
};

export default useQueryProjects;
