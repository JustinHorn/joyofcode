import React, { useState } from "react";

import styles from "./taginput.module.css";

import List from "component/List";

import TechStackTag from "component/Tag/TechStackTag";

import iconList from "data";
import TextField from "@material-ui/core/TextField";

import Autocomplete from "@material-ui/lab/Autocomplete";
import useUpdateForm from "./useUpdateForm";

const TechInput = ({ className, formValue, setSpecificFormValue }) => {
  const {
    onPress,
    getDeleteTag,
    onChange,
    text,
    value: techIcons,
  } = useUpdateForm(formValue, setSpecificFormValue, false);
  return (
    <div className={className}>
      <Autocomplete
        id="combobox"
        options={iconList}
        getOptionLabel={(option) => option.name}
        onKeyPress={onPress}
        onInputChange={onChange}
        inputValue={text}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
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
