import { makeScreenShotAction } from "./Actions";

const title = {
  name: "Title",
  placeholder: "Cookie Clicker",
  value: "",
  trim: true,
};

const sharedOptions = {
  title,
  href: {
    name: "Link to deployed project",
    value: "",
    placeholder: "https://cookieclicker-justin.herokuapp.com/",
    trim: true,
    handler: "action",
    ...makeScreenShotAction,
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

export const testMatch = (options, props) => {
  const requiredKeys = Object.keys(options).filter((key) => options[key].trim);
  for (let i = 0; i < requiredKeys.length; i++) {
    if (!props[requiredKeys[i]].value.trim()) {
      return false;
    }
  }
  return true;
};

export const formatVars = (options, props) => {
  const variables = {};

  Object.keys(options).forEach((key) => {
    const value = props[key].value;
    variables[key] = options[key].trim ? value.trim() : value;
  });
  return variables;
};

export const parseToResource = (options, resource) => {
  const props = {};
  Object.keys(options).forEach((k) => {
    props[k] = { ...options[k] };
  });
  Object.keys(options).forEach((key) => (props[key].value = resource[key]));
  props.tags.value = props.tags.value.map((x) => x.name);
  return props;
};

export { registerOptions, loginOptions, createOptions, updateOptions };
