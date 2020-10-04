import { useEffect } from "react";

import { useQuery, gql } from "@apollo/client";


const query_authorize = gql`
  query {
    authorize {
      id
      name
      email
      verified
    }
  }
`;

const useAutomaticAuthorize = (setUser) => {
  const { data, error } = useQuery(query_authorize);

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
