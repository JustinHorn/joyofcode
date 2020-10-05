import { useEffect } from "react";

import { useLazyQuery, gql } from "@apollo/client";

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

const useAutomaticAuthorize = (setUser) => {
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
      setUser(false);
    }
  }, [error]);
};
export default useAutomaticAuthorize;
