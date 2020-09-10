import React, { useState } from "react";

import styles from "./mutationform.module.css";

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
