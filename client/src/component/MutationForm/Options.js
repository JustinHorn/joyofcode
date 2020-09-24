import { makeScreenShotAction } from "./Actions";
import { useGetImageMutation } from "hooks";

const title = {
  name: "Title",
  value: "",
  placeholder: "Cookie Clicker",
  trim: true,
};

const useGetAction = (setFormValue) => {
  const setImage = (imgUrl) => {
    setFormValue("imgUrl", imgUrl);
  };

  const preview = useGetImageMutation(setImage);

  return preview;
};

const sharedOptions = {
  title,
  href: {
    name: "Link to deployed project",
    value: "",
    placeholder: "https://cookieclicker-justin.herokuapp.com/",
    trim: true,
    handler: "action",
    useGetAction,
    actionName: "make a Screenshot",
  },
  description: {
    name: "Description",
    placeholder: "I love this project",
    value: "",
  },
  imgUrl: {
    name: "Url of image",
    placeholder:
      "https://justinhorntestbucket.s3.amazonaws.com/cookieclicker-justin.herokuapp.com/.png",
    value: "",
  },
  github: {
    name: "Github",
    placeholder: "https://github.com...",
    value: "",
  },
  tags: {
    name: "Tags",
    placeholder: "node.js",
    value: ["react.js"],
    handler: "tag",
  },
};

const createOptions = {
  ...sharedOptions,
};

const updateOptions = {
  ...sharedOptions,
};

const loginOptions = {
  email: {
    name: "Email",
    value: "",
    placeholder: "Email",
    trim: true,
  },
  password: {
    name: "Password",
    value: "",
    placeholder: "Password",
    trim: true,
    pw: true,
  },
};

const registerOptions = {
  ...loginOptions,
  name: {
    name: "Name",
    value: "",
    placeholder: "Name",
    trim: true,
  },
};

const exports = { registerOptions, loginOptions, createOptions, updateOptions };

Object.keys(exports).forEach((key) => {
  const props = exports[key];
  Object.keys(props).forEach((k) => (props[k].defVal = props[k].value));
});

const resetOption = () => {
  Object.keys(exports).forEach((key) => {
    const props = exports[key];
    Object.keys(props).forEach((k) => (props[k].value = props[k].defVal));
  });
};

export {
  registerOptions,
  loginOptions,
  createOptions,
  updateOptions,
  resetOption,
};
