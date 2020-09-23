import React from "react";
import { MutationOptions, useHandleFormValues } from "component/MutationForm";

import { updateOptions as options } from "component/MutationForm";

import { useUpdateResource } from "hooks";

import Edit from "./Create/Edit";

import Preview from "./Create/Preview";

const UpdateResource = ({ resource, afterUpdate }) => {
  const { id } = resource;
  const { update } = useUpdateResource();
  const MO = new MutationOptions(options);

  const props = useHandleFormValues(MO.parseToResource(resource));

  const doUpdateMutation = (props) => {
    const variables = MO.formatVars(props);
    variables.id = id;
    update({ variables });
    afterUpdate();
    return true;
  };

  const mutateSth = () => {
    doUpdateMutation(props.formValues);
  };

  props.onClick = mutateSth;

  return (
    <div className={""}>
      <h2>Update your project</h2>

      <Edit props={props}></Edit>
      <Preview formValues={props.formValues}></Preview>
    </div>
  );
};

export default UpdateResource;
