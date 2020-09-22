import React, { useEffect, useState } from "react";

import { useGetImageMutation } from "hooks";
import { MutationFormWithoutState } from "component/MutationForm";

import styles from "./edit.module.css";

const Edit = ({ props }) => {
  return (
    <div className="edit">
      <MutationFormWithoutState headline="share" {...props} />
    </div>
  );
};

export default Edit;
