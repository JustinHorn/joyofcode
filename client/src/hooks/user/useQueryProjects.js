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

const useQueryProjects = ({ userId }) => {
  const { data, loading, error } = useQuery(userProjectsQuery, {
    variables: { id: userId, take: 10, orderBy: { date: "desc" } },
  });

  return { data, loading, error };
};

export default useQueryProjects;
