import React, { useState } from "react";

import styles from "./mutationform.module.css";

const ChooseFormType = (props) => {
  const { k: key, formValues, setFormValue } = props;

  return (
    (!formValues[key].tag && (
      <input
        placeholder={formValues[key].placeholder || key}
        value={formValues[key].value}
        onChange={(e) => setFormValue(key, e.target.value)}
      />
    )) || <TagInput {...props} />
  );
};

const TagInput = ({ k, formValues, setFormValue }) => {
  const key = k;
  const tags = formValues[key].value;

  const [text, setText] = useState("");

  const onPress = (e) => {
    if (e.charCode === 13) {
      setFormValue(key, [...tags, text]);
      setText("");
    }
  };

  const deleteTag = (index) => () => {
    setFormValue(key, [...tags.slice(0, index), ...tags.slice(index + 1)]);
  };

  const onChange = (e) => {
    setText(e.target.value.trim());
  };
  return (
    <div>
      <input
        type="text"
        value={text}
        placeholder={formValues[key].placeholder}
        onKeyPress={onPress}
        onChange={onChange}
      />
      <ul className={styles.taglist}>
        {tags.map((t, index) => (
          <li key={index} className={styles.tag}>
            {t} <button onClick={deleteTag(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChooseFormType;
