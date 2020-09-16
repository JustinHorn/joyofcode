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
  return { stateProps, setProps, mutateSth };
};

const MutationForm = ({ doMutation, headline, props }) => {
  const [stateProps, setProps] = useState(props);

  const mutateSth = () => {
    if (doMutation(stateProps)) {
      setProps(props);
    }
  };

  return (
    <MutationFormWithoutState
      stateProps={stateProps}
      setProps={setProps}
      headline={headline}
      mutateSth={mutateSth}
    ></MutationFormWithoutState>
  );
};

export const MutationFormWithoutState = ({
  mutateSth,
  headline,
  stateProps,
  setProps,
}) => {
  return (
    <div className={styles.form}>
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
