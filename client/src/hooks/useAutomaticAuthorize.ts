import { useEffect } from "react";

import { useLazyQuery, gql } from "@apollo/client";
import { NoUser } from "context/UserContext";

const query_authorize = gql`
  query {
    authorize {
      id
      name
      email
      verified
      projectCount
      likeCount
      commentCount
    }
  }
`;

type useAutomaticAuthorizeProps = (x: User) => void;

const useAutomaticAuthorize = (setUser: useAutomaticAuthorizeProps) => {
  const [call, { data, error }] = useLazyQuery(query_authorize);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      call();
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data.authorize);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setUser(NoUser);
    }
  }, [error]);
};
export default useAutomaticAuthorize;
