import React from "react";

import styles from "./taginput.module.css";

import List from "component/List";

import Tag from "component/Tag";

import TextField from "@material-ui/core/TextField";

import useUpdateForm from "./useUpdateForm";

const TagInput = ({ className, formValue, setSpecificFormValue }) => {
  const { onPress, getDeleteTag, setText, text, value } = useUpdateForm(
    formValue,
    setSpecificFormValue,
    true
  );

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
          list={value.map((t, i) => ({
            text: t,
            Button: <button onClick={getDeleteTag(i)}>X</button>,
          }))}
        />
      </ul>
    </div>
  );
};

export default TagInput;
