import React, { useEffect } from "react";

import { gql, useMutation } from "@apollo/client";

const authWithGithub = gql`
  mutation authorizeWithGithub($code: String!) {
    authorizeWithGithub(code: $code) {
      token
      user {
        name
        id
        verified
      }
    }
  }
`;

const useAuthWithCode = () => {
  return useMutation(authWithGithub);
};

export default useAuthWithCode;
