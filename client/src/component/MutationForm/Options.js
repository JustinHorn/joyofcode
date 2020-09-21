import { makeScreenShotAction } from "./Actions";

const sharedOptions = {
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

const title = {
  name: "Title",
  value: "",
  placeholder: "Cookie Clicker",
  trim: true,
};

const createOptions = {
  title,
  href: {
    name: "Link to deployed project",
    value: "",
    placeholder: "https://cookieclicker-justin.herokuapp.com/",
    trim: true,
    handler: "action",
    ...makeScreenShotAction,
  },
  ...sharedOptions,
};

const updateOptions = {
  title,
  href: {
    name: "Get an imgUrl",
    value: "",
    handler: "actionNoInput",
    ...makeScreenShotAction,
  },
  ...sharedOptions,
};

export { createOptions, updateOptions };
