import React, { useState } from "react";

import styles from "./mutationform.module.css";

import Popup from "component/Popup";

const MutationPopup = ({ show, onClickAway, doMutation, headline, props }) => (
  <Popup show={show} onClickAway={onClickAway}>
    <MutationForm {...{ doMutation, headline, props }}></MutationForm>{" "}
  </Popup>
);

export const useHandleFormValues = (props) => {
  const [formValues, setFormValues] = useState(props);

  const resetFormValues = () => {
    setFormValues(props);
  };

  const setFormValue = (key, value) => {
    const new_props = { ...formValues };
    new_props[key] = {
      ...formValues[key],
      value: value,
    };
    setFormValues(new_props);
  };

  return { formValues, setFormValue, resetFormValues };
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

export const MutationFormWithoutState = ({
  onClick,
  headline,
  formValues,
  setFormValue,
}) => {
  return (
    <div className={styles.form}>
      <table className={styles.table}>
        <tbody>
          {Object.keys(formValues).map((key, index) => (
            <tr key={index} className={styles.column}>
              <td>
                <h4>
                  {formValues[key].name}
                  {formValues[key].trim ? "*" : ""}:
                </h4>
              </td>
              <td>
                <input
                  placeholder={formValues[key].placeholder || key}
                  value={formValues[key].value}
                  onChange={(e) => setFormValue(key, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={onClick}>{headline}</button>
    </div>
  );
};

export default MutationForm;
