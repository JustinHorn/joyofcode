import { useEffect, useContext } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

import UserContext from "context";

const mutation_login = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        verified
      }
    }
  }
`;

const mutation_register = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
        verified
      }
    }
  }
`;

const useLoginOrRegister = (isLogin) => {
  const [mutate, { data, error }] = useMutation(
    isLogin ? mutation_login : mutation_register
  );

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const { login } = useContext(UserContext);

  useEffect(() => {
    if (data) {
      const source = isLogin ? data.login : data.register;
      login(source.user, source.token);
    }
  }, [data]);

  return { mutate };
};

export default useLoginOrRegister;
