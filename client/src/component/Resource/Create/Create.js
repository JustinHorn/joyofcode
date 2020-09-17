import React, { useState, useContext, useEffect } from "react";

import { useHandleFormValues, MutationOptions } from "component/MutationForm";

import styles from "./create.module.css";

import { createOptions as options } from "component/MutationForm";

import { useCreateResource } from "hooks";

import Edit from "./Edit";

import Preview from "./Preview";

const CreateResource = () => {
  const { createResource } = useCreateResource();
  const MO = new MutationOptions(options);

  const doMutation = (props) => {
    if (MO.testMatch(props)) {
      const variables = MO.formatVars(props);
      variables.tags = variables.tags.split(",");
      createResource({ variables });
      return true;
    }
    return false;
  };

  const props = useHandleFormValues(MO.options, doMutation);

  return (
    <div className={styles.create}>
      <h2>Share your project!</h2>
      <Edit props={props}></Edit>
      <Preview formValues={props.formValues}></Preview>
    </div>
  );
};

export default CreateResource;
