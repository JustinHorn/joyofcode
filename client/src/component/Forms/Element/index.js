import React from "react";

import FormHandler from "component/Forms/Handler";

import styles from "./element.module.css";

const Element = (props) => {
  const { k: key, formValues } = props;

  return (
    <div className={styles.element}>
      <h4>
        {formValues[key].name}
        {formValues[key].trim ? "*" : ""}:
      </h4>

      <FormHandler {...props} />
    </div>
  );
};

export default Element;
