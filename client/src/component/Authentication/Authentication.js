import React from "react";

import { useLoginOrRegister } from "hooks";

import MutationForm, { MutationOptions } from "component/MutationForm";

import { loginOptions, registerOptions } from "component/MutationForm/Options";

const Authentication = ({ isLogin }) => {
  const MO = new MutationOptions(isLogin ? loginOptions : registerOptions);

  const { mutate: loginOrRegister } = useLoginOrRegister(isLogin);

  const doMutation = (props) => {
    if (MO.testMatch(props)) {
      const variables = MO.formatVars(props);
      loginOrRegister({ variables });
      return true;
    }
    return false;
  };

  return (
    <MutationForm
      doMutation={doMutation}
      headline={isLogin ? "Login" : "Register"}
      props={MO.options}
    />
  );
};

export default Authentication;
