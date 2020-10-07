import { useState } from "react";

import iconList from "data";

const isTagName = (name) => {
  return iconList.some((i) => i.name === name);
};

const useUpdateForm = (formValue, setSpecificFormValue, notChecktagName) => {
  const value = formValue.value;
  const [text, setText] = useState("");

  const onPress = (e) => {
    if (e.charCode === 13 && (notChecktagName || isTagName(text))) {
      e.preventDefault();

      setSpecificFormValue([...value, text]);
      setText("");
    }
  };

  const getDeleteTag = (index) => () => {
    setSpecificFormValue([...value.slice(0, index), ...value.slice(index + 1)]);
  };

  const onChange = (e, value) => {
    setText(value.trim().toLowerCase());
  };

  return { onPress, getDeleteTag, onChange, text, value };
};

export default useUpdateForm;
