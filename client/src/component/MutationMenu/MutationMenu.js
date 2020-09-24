import React from "react";
import Edit from "./Edit";

import Preview from "./Preview";

import styles from "./menu.module.css";

import { testMatch, formatVars } from "component/MutationForm/Options";

const MutationMenu = ({ options, mutation, props, headline }) => {
  const doMutation = (props) => {
    if (testMatch(options, props)) {
      const variables = formatVars(options, props);
      mutation({ variables });
      return true;
    }
    return false;
  };

  const mutateSth = () => {
    doMutation(props.formValues);
  };

  props.onClick = mutateSth;
  return (
    <div className={styles.menu}>
      <h2>{headline}</h2>

      <Edit props={props}></Edit>
      <Preview formValues={props.formValues}></Preview>
    </div>
  );
};

export default MutationMenu;
