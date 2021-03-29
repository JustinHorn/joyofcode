import { useState } from "react";

import iconList from "data";

const isTagName = (name, notChecktagName) => {
  if (notChecktagName) {
    return true;
  }
  return iconList.some((i) => i.name === name);
};

const useUpdateForm = (formValue, setSpecificFormValue, notChecktagName) => {
  const value = formValue.value;
  const [text, setText] = useState("");

  const onPress = (e) => {
    if (e.charCode === 13 && isTagName(text, notChecktagName && text)) {
      e.preventDefault();
      setSpecificFormValue([...value, text]);
      setText("");
    }
  };

  const getDeleteTag = (index) => () => {
    setSpecificFormValue([...value.slice(0, index), ...value.slice(index + 1)]);
  };

  return { onPress, getDeleteTag, value, text, setText };
};

export default useUpdateForm;
