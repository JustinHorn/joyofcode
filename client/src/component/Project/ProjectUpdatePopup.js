import React from "react";

import Popup from "component/Popup";

import { useHandleFormValues } from "component/forms/MutationForm";
import { updateOptions } from "forms/Options";
import useUpdateProject from "hooks/project/useUpdate";
import MutationMenu from "component/MutationMenu";

const ProjectUpdatePopup = ({ projectValues, show, onClickAway }) => {
  const { id } = projectValues;

  const propsM = useHandleFormValues(updateOptions, projectValues);
  const { update: mutation } = useUpdateProject();

  const doMutation = ({ variables }) => {
    variables.id = id;
    mutation({ variables });
    onClickAway();
  };

  return (
    <Popup show={show} onClickAway={onClickAway}>
      <MutationMenu
        actionName={"Update"}
        options={updateOptions}
        mutation={doMutation}
        headline={"Update your project"}
        props={propsM}
      />
    </Popup>
  );
};

export default ProjectUpdatePopup;
