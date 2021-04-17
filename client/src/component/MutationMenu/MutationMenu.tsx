import React from "react";
import Edit from "./Edit";

import Preview from "./Preview";

import styles from "./menu.module.css";

import { testMatch, formatVars } from "forms/Options";

type MutationMenuProps = {
  options: any;
  mutation: (x: { variables: any }) => any;
  props: any;
  headline?: string;
  actionName?: string;
};

const MutationMenu = ({
  options,
  mutation,
  props,
  headline,
  actionName,
}: MutationMenuProps) => {
  const doMutation = (props:object) => {
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
