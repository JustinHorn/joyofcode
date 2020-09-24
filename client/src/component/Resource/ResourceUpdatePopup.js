import React from "react";

import Popup from "component/Popup";

import { MutationOptions, useHandleFormValues } from "component/MutationForm";
import { updateOptions } from "component/MutationForm";
import { useUpdateResource } from "hooks";

import MutationMenu from "component/MutationMenu";

const ResourceUpdatePopup = ({ resourceValues, show, onClickAway }) => {
  const { id } = resourceValues;
  const MO = new MutationOptions(updateOptions);

  const propsM = useHandleFormValues(updateOptions, resourceValues);
  const { update: mutation } = useUpdateResource();

  const doMutation = ({ variables }) => {
    variables.id = id;
    mutation({ variables });
    onClickAway();
  };

  return (
    <Popup show={show} onClickAway={onClickAway}>
      <MutationMenu
        MO={MO}
        mutation={doMutation}
        headline={"Update your project"}
        props={propsM}
      />
    </Popup>
  );
};

export default ResourceUpdatePopup;
