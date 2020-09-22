import React from "react";
import MutationForm, { MutationOptions } from "component/MutationForm";

import { updateOptions as options } from "component/MutationForm";

import { useUpdateResource } from "hooks";

const UpdateResource = ({ resource, afterUpdate }) => {
  const { id } = resource;
  const { update } = useUpdateResource();
  const MO = new MutationOptions(options);

  const doUpdateMutation = (props) => {
    const variables = MO.formatVars(props);
    variables.id = id;
    update({ variables });
    afterUpdate();
    return true;
  };

  return (
    <MutationForm
      doMutation={doUpdateMutation}
      headline={"update"}
      props={MO.parseToResource(resource)}
    />
  );
};

export default UpdateResource;
