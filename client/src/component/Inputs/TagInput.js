import React, { useState } from "react";

import styles from "./taginput.module.css";

const TagInput = ({ className, formValue, setSpecificFormValue }) => {
  const tags = formValue.value;

  const [text, setText] = useState("");

  const onPress = (e) => {
    if (e.charCode === 13) {
      setSpecificFormValue([...tags, text]);
      setText("");
    }
  };

  const deleteTag = (index) => () => {
    setSpecificFormValue([...tags.slice(0, index), ...tags.slice(index + 1)]);
  };

  const onChange = (e) => {
    setText(e.target.value.trim());
  };
  return (
    <div className={className}>
      <input
        type="text"
        value={text}
        placeholder={formValue.placeholder}
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

export default TagInput;
