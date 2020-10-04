import { useContext, useEffect } from "react";

import { useLazyQuery ,gql} from "@apollo/client";
import UserContext from "context";

const QueryUser = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      name
      projectCount
      likeCount
      commentCount
    }
  }
`;

const useGetUser = (id) => {
  const { user: currentUser, idOfCurrentUser } = useContext(UserContext);

  const [getUserData, { data, loading, error }] = useLazyQuery(QueryUser, {
    variables: { id },
  });

  let isIdOfCurrentUser = idOfCurrentUser(id);

  useEffect(() => {
    !isIdOfCurrentUser && getUserData();
  }, [id]);

  return (isIdOfCurrentUser && currentUser) || data?.user;
};

export default useGetUser;
