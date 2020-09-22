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
      }
    }
  }
`;

const useLoginOrRegister = (isLogin) => {
  const [mutate, { data, error }] = useMutation(
    isLogin ? mutation_login : mutation_register
  );

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
