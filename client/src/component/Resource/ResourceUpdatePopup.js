import React from "react";

import Popup from "component/Popup";

import { useHandleFormValues } from "component/MutationForm";
import { updateOptions } from "forms/Options";
import { useUpdateResource } from "hooks";
import MutationMenu from "component/MutationMenu";

const ResourceUpdatePopup = ({ resourceValues, show, onClickAway }) => {
  const { id } = resourceValues;

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
        options={updateOptions}
        mutation={doMutation}
        headline={"Update your project"}
        props={propsM}
      />
    </Popup>
  );
};

export default ResourceUpdatePopup;
