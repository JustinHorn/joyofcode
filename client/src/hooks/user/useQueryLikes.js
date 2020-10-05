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

const useQueryLikes = ({ userId }) => {
  const { data, loading, error } = useQuery(userLikeQuery, {
    variables: { id: userId, take: 20, orderBy: { date: "desc" } },
  });

  return { data, loading, error };
};

export default useQueryLikes;
