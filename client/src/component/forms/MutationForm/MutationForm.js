import React, { useEffect, useState } from "react";

import styles from "./mutationform.module.css";

import { updateOptions, parseToResource } from "forms/Options";

import List from "component/List";

import Element from "component/forms/Element";

export const useHandleFormValues = (props, resourceValues) => {
  const [formValues, setFormValues] = useState(props);

  const resetFormValues = () => {
    setFormValues(props);
  };

  useEffect(() => {
    if (resourceValues) {
      setFormValues(parseToResource(updateOptions, resourceValues));
    }
  }, [resourceValues]);

  const setFormValue = (key, value) => {
    const new_props = { ...formValues };
    new_props[key] = {
      ...formValues[key],
      value: value,
    };
    setFormValues(new_props);
  };

  return { formValues, setFormValue, resetFormValues, setFormValues };
};

const MutationForm = ({ doMutation, headline, props }) => {
  const { formValues, setFormValue } = useHandleFormValues(props);

  return (
    <MutationFormWithoutState
      formValues={formValues}
      headline={headline}
      onClick={() => doMutation(formValues)}
      setFormValue={setFormValue}
    />
  );
};

export const MutationFormWithoutState = (props) => {
  const { onClick, headline, formValues, setFormValue } = props;
  return (
    <div className={styles.form}>
      <div className="list">
        <List
          Key={"MFWS"}
          list={Object.keys(formValues).map((key, index) => ({
            key: index,
            k: key,
            formValues,
            setFormValue,
          }))}
          Component={Element}
        />
      </div>

      <button onClick={onClick}>{headline}</button>
    </div>
  );
};

export default MutationForm;
