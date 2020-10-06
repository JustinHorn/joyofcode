import React, { useState } from "react";

import styles from "./taginput.module.css";

import List from "component/List";

import TechStackTag from "component/Tag/TechStackTag";

import iconList from "data";
import TextField from "@material-ui/core/TextField";

import Autocomplete from "@material-ui/lab/Autocomplete";

const isTagName = (name) => {
  return iconList.some((i) => i.name === name);
};

const TechInput = ({ className, formValue, setSpecificFormValue }) => {
  const techIcons = formValue.value;

  const [text, setText] = useState("");

  const onPress = (e) => {
    if (e.charCode === 13 && isTagName(text)) {
      e.preventDefault();

      setSpecificFormValue([...techIcons, text]);
      setText("");
    }
  };

  const getDeleteTag = (index) => () => {
    setSpecificFormValue([
      ...techIcons.slice(0, index),
      ...techIcons.slice(index + 1),
    ]);
  };

  const onChange = (e, value) => {
    setText(value.trim().toLowerCase());
  };
  return (
    <div className={className}>
      <Autocomplete
        options={iconList}
        getOptionLabel={(option) => option.name}
        onKeyPress={onPress}
        onInputChange={onChange}
        inputValue={text}
        renderInput={(params) => (
          <TextField
            inputProps={{
              placeholder: formValue.placeholder,
            }}
            {...params}
            variant="outlined"
          />
        )}
      />

      <ul className={styles.taglist}>
        <List
          Key={"techIcons"}
          Component={TechStackTag}
          list={techIcons.map((name, i) => ({
            iconVal: iconList.find((i) => i.name === name),
            Button: <button onClick={getDeleteTag(i)}>X</button>,
          }))}
        />
      </ul>
    </div>
  );
};

export default TechInput;
