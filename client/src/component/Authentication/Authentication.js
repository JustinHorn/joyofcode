import React, { useEffect } from "react";

import { useLoginOrRegister } from "hooks";

import {
  useHandleFormValues,
  MutationFormWithoutState,
} from "component/MutationForm";

import { loginOptions, registerOptions } from "component/MutationForm/Options";

import { testMatch, formatVars } from "component/MutationForm/Options";

const Authentication = ({ isLogin }) => {
  const options = isLogin ? loginOptions : registerOptions;

  const { mutate: loginOrRegister } = useLoginOrRegister(isLogin);

  const { formValues, setFormValue, setFormValues } = useHandleFormValues(
    options
  );

  useEffect(() => {
    setFormValues(options);
  }, [isLogin]);

  const doMutation = (props) => {
    if (testMatch(options, props)) {
      const variables = formatVars(options, props);
      loginOrRegister({ variables });
      return true;
    }
    return false;
  };

  return (
    <MutationFormWithoutState
      formValues={formValues}
      headline={isLogin ? "Login" : "Register"}
      onClick={() => doMutation(formValues)}
      setFormValue={setFormValue}
    />
  );
};

export default Authentication;
