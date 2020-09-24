import React from "react";
import Edit from "./Edit";

import Preview from "./Preview";

import styles from "./menu.module.css";

import { testMatch, formatVars } from "forms/Options";

const MutationMenu = ({ options, mutation, props, headline, actionName }) => {
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

      <Edit props={props} actionName={actionName} />
      <Preview formValues={props.formValues} />
    </div>
  );
};

export default MutationMenu;
