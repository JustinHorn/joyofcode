import React, { useState } from "react";

import styles from "./mutationform.module.css";

import Popup from "component/Popup";

const MutationPopup = ({ show, onClickAway, doMutation, headline, props }) => (
  <Popup show={show} onClickAway={onClickAway}>
    <MutationForm {...{ doMutation, headline, props }}></MutationForm>{" "}
  </Popup>
);

const MutationForm = ({ doMutation, headline, props }) => {
  const [stateProps, setProps] = useState(props);

  const mutateSth = () => {
    if (doMutation(stateProps)) {
      setProps(props);
    }
  };

  return (
    <div className={styles.createResource}>
      {Object.keys(stateProps).map((key, index) => (
        <input
          key={index}
          placeholder={key}
          value={stateProps[key]}
          onChange={(e) => {
            let new_props = { ...stateProps };
            new_props[key] = e.target.value;
            setProps(new_props);
          }}
        />
      ))}

      <button onClick={mutateSth}>{headline}</button>
    </div>
  );
};

export default MutationForm;

export function MutationOptions(options) {
  this.options = options;

  this.testMatch = (props) => {
    const requiredKeys = Object.keys(this.options).filter(
      (key) => this.options[key] === "rq"
    );
    for (let i = 0; i < requiredKeys.length; i++) {
      if (!props[requiredKeys[i]].trim()) {
        return false;
      }
    }
    return true;
  };

  this.formatVars = (props) => {
    const variables = {};

    Object.keys(this.options).forEach((key) => {
      variables[key] =
        this.options[key] === "rq" ? props[key].trim() : props[key];
      variables[key] = variables[key] ? variables[key] : undefined;
    });
    return variables;
  };

  this.nullyfy = () => {
    const nullOptions = {};
    Object.keys(this.options).forEach((key) => (nullOptions[key] = ""));
    return nullOptions;
  };
}
