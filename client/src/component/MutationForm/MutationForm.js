import React, { useEffect, useState } from "react";

import styles from "./mutationform.module.css";

import Popup from "component/Popup";

import FormHandler from "./FormHandler";

import { updateOptions, parseToResource } from "./Options";

const MutationPopup = ({ show, onClickAway, doMutation, headline, props }) => (
  <Popup show={show} onClickAway={onClickAway}>
    <MutationForm {...{ doMutation, headline, props }} />
  </Popup>
);

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
      <table className={styles.table}>
        <tbody>
          {Object.keys(formValues).map((key, index) => (
            <Elements
              key={index}
              k={key}
              formValues={formValues}
              setFormValue={setFormValue}
            />
          ))}
        </tbody>
      </table>

      <button onClick={onClick}>{headline}</button>
    </div>
  );
};

const Elements = (props) => {
  const { k: key, formValues } = props;

  return (
    <tr className={styles.column}>
      <td>
        <h4>
          {formValues[key].name}
          {formValues[key].trim ? "*" : ""}:
        </h4>
      </td>
      <td>
        <FormHandler {...props} />
      </td>
    </tr>
  );
};

export default MutationForm;
