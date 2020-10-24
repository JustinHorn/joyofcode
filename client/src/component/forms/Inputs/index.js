import React, { useState } from "react";

import TagInput from "./TagInput";

import TechInput from "./TechInput";

import TextField from "@material-ui/core/TextField";

const selectComponent = (handler) => {
  switch (handler) {
    case "tech":
      return TechInput;
    case "tag":
      return TagInput;
    case "action":
      return ActionInput;
    case "actionNoInput":
      return ActionNoInput;
    case "textarea":
      return TextAreaInput;
    default:
      return DefaultInput;
  }
};

export default selectComponent;

const DefaultInput = ({ formValue, setSpecificFormValue }) => {
  return (
    <TextField
      type={formValue.pw ? "password" : "text"}
      placeholder={formValue.placeholder || ""}
      value={formValue.value}
      onChange={(e) => setSpecificFormValue(e.target.value)}
      variant="outlined"
    />
  );
};

const TextAreaInput = ({ formValue, setSpecificFormValue }) => {
  return (
    <textarea
      rows={10}
      cols={30}
      type={formValue.pw ? "password" : "text"}
      placeholder={formValue.placeholder || ""}
      value={formValue.value}
      onChange={(e) => setSpecificFormValue(e.target.value)}
    />
  );
};

const ActionInput = ({
  formValue,
  setSpecificFormValue,
  action,
  actionName,
}) => {
  return (
    <div>
      <TextField
        type={formValue.pw ? "password" : "text"}
        placeholder={formValue.placeholder || ""}
        value={formValue.value}
        onChange={(e) => setSpecificFormValue(e.target.value)}
        variant="outlined"
      />
      <br />
      <button onClick={() => action(formValue.value)}>{actionName}</button>
    </div>
  );
};

/**
 * Save href, generate picture
 * @param {S} param0
 */
const ActionNoInput = ({ formValue, action, actionName }) => {
  return <button onClick={() => action(formValue.value)}>{actionName}</button>;
};
