import React, { useState, useEffect } from "react";

import { gql } from "apollo-boost";

import { useQuery } from "@apollo/client";

const query_authorize = gql`
  query {
    authorize {
      id
      name
      email
    }
  }
`;

const useAutomaticAuthorize = (setUser) => {
  const { data } = useQuery(query_authorize);

  useEffect(() => {
    if (data) {
      setUser(data.authorize);
    }
  }, [data]);
};
export default useAutomaticAuthorize;
