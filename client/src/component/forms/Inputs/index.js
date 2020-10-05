import React, { useState } from "react";

import TagInput from "./TagInput";

const selectComponent = (handler) => {
  switch (handler) {
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
    <input
      type={formValue.pw ? "password" : "text"}
      placeholder={formValue.placeholder || ""}
      value={formValue.value}
      onChange={(e) => setSpecificFormValue(e.target.value)}
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
      <input
        type={formValue.pw ? "password" : "text"}
        placeholder={formValue.placeholder || ""}
        value={formValue.value}
        onChange={(e) => setSpecificFormValue(e.target.value)}
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
