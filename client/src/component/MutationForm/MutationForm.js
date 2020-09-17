import React, { useState } from "react";

import styles from "./mutationform.module.css";

import Popup from "component/Popup";

const MutationPopup = ({ show, onClickAway, doMutation, headline, props }) => (
  <Popup show={show} onClickAway={onClickAway}>
    <MutationForm {...{ doMutation, headline, props }}></MutationForm>{" "}
  </Popup>
);

export const useProps = (props, doMutation) => {
  const [stateProps, setProps] = useState(props);

  const mutateSth = () => {
    if (doMutation(stateProps)) {
      setProps(props);
    }
  };

  const setProp = (key, value) => {
    const new_props = { ...stateProps };
    new_props[key] = {
      ...stateProps[key],
      value: value,
    };
    setProps(new_props);
  };

  return { stateProps, setProp, mutateSth };
};

const MutationForm = ({ doMutation, headline, props }) => {
  const { stateProps, mutateSth, setProp } = useProps(props, doMutation);

  return (
    <MutationFormWithoutState
      stateProps={stateProps}
      headline={headline}
      mutateSth={mutateSth}
      setProp={setProp}
    ></MutationFormWithoutState>
  );
};

export const MutationFormWithoutState = ({
  mutateSth,
  headline,
  stateProps,
  setProp,
}) => {
  return (
    <div className={styles.form}>
      <table className={styles.table}>
        <tbody>
          {Object.keys(stateProps).map((key, index) => (
            <tr key={index} className={styles.column}>
              <td>
                <h4>{stateProps[key].name}</h4>
              </td>
              <td>
                <input
                  placeholder={stateProps[key].placeholder || key}
                  value={stateProps[key].value}
                  onChange={(e) => setProp(key, e.target.value)}
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
