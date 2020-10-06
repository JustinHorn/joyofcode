import React, { useState } from "react";

import styles from "./taginput.module.css";

import List from "component/List";

import Tag from "component/Tag";

import TextField from "@material-ui/core/TextField";

const TagInput = ({ className, formValue, setSpecificFormValue }) => {
  const tags = formValue.value;

  const [text, setText] = useState("");

  const onPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      setSpecificFormValue([...tags, text]);
      setText("");
    }
  };

  const getDeleteTag = (index) => () => {
    setSpecificFormValue([...tags.slice(0, index), ...tags.slice(index + 1)]);
  };

  const onChange = (e) => {
    setText(e.target.value.trim().toLowerCase());
  };
  return (
    <div className={className}>
      <TextField
        type="text"
        value={text}
        placeholder={formValue.placeholder}
        onKeyPress={onPress}
        onChange={onChange}
        variant="outlined"
      />
      <ul className={styles.taglist}>
        <List
          Key={"tags"}
          Component={Tag}
          list={tags.map((t, i) => ({
            text: t,
            Button: <button onClick={getDeleteTag(i)}>X</button>,
          }))}
        />
      </ul>
    </div>
  );
};

export default TagInput;
