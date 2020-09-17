import React, { useState } from "react";

import styles from "./mutationform.module.css";

import Popup from "component/Popup";

const MutationPopup = ({ show, onClickAway, doMutation, headline, props }) => (
  <Popup show={show} onClickAway={onClickAway}>
    <MutationForm {...{ doMutation, headline, props }}></MutationForm>{" "}
  </Popup>
);

export const useHandleFormValues = (props, doMutation) => {
  const [formValues, setFormValues] = useState(props);

  const mutateSth = () => {
    if (doMutation(formValues)) {
      setFormValues(props);
    }
  };

  const setFormValue = (key, value) => {
    const new_props = { ...formValues };
    new_props[key] = {
      ...formValues[key],
      value: value,
    };
    setFormValues(new_props);
  };

  return { formValues, setFormValue, mutateSth };
};

const MutationForm = ({ doMutation, headline, props }) => {
  const { formValues, mutateSth, setFormValue } = useHandleFormValues(props, doMutation);

  return (
    <MutationFormWithoutState
      formValues={formValues}
      headline={headline}
      mutateSth={mutateSth}
      setFormValue={setFormValue}
    ></MutationFormWithoutState>
  );
};

export const MutationFormWithoutState = ({
  mutateSth,
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
                <h4>{formValues[key].name}</h4>
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

      <button onClick={mutateSth}>{headline}</button>
    </div>
  );
};

export default MutationForm;
