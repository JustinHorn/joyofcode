import React from "react";

import { MutationFormWithoutState } from "component/forms/MutationForm";

export type EditProps = {
  props: any;
  actionName?: string;
};

const Edit = ({ props, actionName }: EditProps) => {
  return (
    <div className="edit">
      <MutationFormWithoutState headline={actionName || "share"} {...props} />
    </div>
  );
};

export default Edit;
