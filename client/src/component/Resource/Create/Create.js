import React from "react";

import { useHandleFormValues, MutationOptions } from "component/MutationForm";

import styles from "./create.module.css";

import { createOptions as options } from "component/MutationForm";

import { useCreateResource } from "hooks";

import Edit from "./Edit";

import Preview from "./Preview";

const CreateResource = () => {
  const MO = new MutationOptions(options);

  const props = useHandleFormValues(MO.options);

  const { createResource } = useCreateResource(props.resetFormValues);

  const doMutation = (props) => {
    if (MO.testMatch(props)) {
      const variables = MO.formatVars(props);
      createResource({ variables });
      return true;
    }
    return false;
  };

  const mutateSth = () => {
    doMutation(props.formValues);
  };

  props.onClick = mutateSth;

  return (
    <div className={styles.create}>
      <h2>Share your project!</h2>
      <Edit props={props}></Edit>
      <Preview formValues={props.formValues}></Preview>
    </div>
  );
};

export default CreateResource;
