import React from "react";

import selectComponent from "component/forms/Inputs";

const FormHandler = (props) => {
  const { k: key, formValues, setFormValue } = props;

  const formValue = formValues[key];
  const componentProps = {
    formValue,
    setSpecificFormValue: (v) => setFormValue(key, v),
  };

  if (formValue.handler === "action" || formValue.handler === "actionNoInput") {
    if (!formValue.useGetAction) {
      debugger;
    }
    componentProps["action"] = formValue.useGetAction(setFormValue);
    componentProps["actionName"] = formValue.actionName;
  }

  const Component = selectComponent(formValue.handler);
  return <Component {...componentProps}></Component>;
};

export default FormHandler;
