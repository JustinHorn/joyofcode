import React, { useEffect } from "react";

import { useLoginOrRegister } from "hooks";

import {
  MutationOptions,
  useHandleFormValues,
  MutationFormWithoutState,
} from "component/MutationForm";

import { loginOptions, registerOptions } from "component/MutationForm/Options";

const Authentication = ({ isLogin }) => {
  const MO = new MutationOptions(isLogin ? loginOptions : registerOptions);

  const { mutate: loginOrRegister } = useLoginOrRegister(isLogin);

  const { formValues, setFormValue, setFormValues } = useHandleFormValues(
    MO.options
  );

  useEffect(() => {
    setFormValues(MO.options);
  }, [isLogin]);

  const doMutation = (props) => {
    if (MO.testMatch(props)) {
      const variables = MO.formatVars(props);
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
