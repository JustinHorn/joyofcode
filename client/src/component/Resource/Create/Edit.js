import React from "react";

import { MutationFormWithoutState } from "component/MutationForm";

const Edit = ({ props }) => {
  return (
    <div className="edit">
      <MutationFormWithoutState headline="share" {...props} />
    </div>
  );
};

export default Edit;
