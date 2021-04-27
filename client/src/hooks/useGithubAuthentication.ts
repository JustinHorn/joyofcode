import { useEffect, useContext } from "react";

import { gql, useMutation } from "@apollo/client";

import UserContext from "context/UserContext";

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

type useAuthWithCodeReturn = [
  (x: { variables: { code: string } }) => void,
  { data: any; error: any }
];

const useAuthWithCode = (): useAuthWithCodeReturn => {
  const [mutate, { data, error }] = useMutation(authWithGithub);
  const { login } = useContext(UserContext);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      const { token, user } = data.authorizeWithGithub;
      login(user, token);
    }
  }, [data]);

  return [mutate, { data, error }];
};

export default useAuthWithCode;
