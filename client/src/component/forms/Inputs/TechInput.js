import React, { useState } from "react";

import styles from "./taginput.module.css";

import List from "component/List";

import TechStackTag from "component/Tag/TechStackTag";

import iconList from "data";

const TechInput = ({ className, formValue, setSpecificFormValue }) => {
  const techIcons = formValue.value;

  const [text, setText] = useState("");

  const onPress = (e) => {
    if (e.charCode === 13) {
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

  const onChange = (e) => {
    setText(e.target.value.trim().toLowerCase());
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
