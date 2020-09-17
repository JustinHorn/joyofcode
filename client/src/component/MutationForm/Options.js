const sharedOptions = {
  description: {
    name: "Description:",
    placeholder: "I love this project",
    value: "",
  },
  imgUrl: {
    name: "Url of image:",
    placeholder:
      "https://justinhorntestbucket.s3.amazonaws.com/cookieclicker-justin.herokuapp.com/.png",
    value: "",
  },
  github: {
    name: "Github:",
    placeholder: "https://github.com...",
    value: "",
  },
  tags: { name: "Tags:", placeholder: "tag1,tag2,tag3...", value: "" },
};

const title = {
  name: "Title:",
  value: "",
  placeholder: "Cookie Clicker",
  trim: true,
};

const createOptions = {
  title,
  href: {
    name: "Link to deployed project:",
    value: "",
    placeholder: "https://cookieclicker-justin.herokuapp.com/",
    trim: true,
  },
  ...sharedOptions,
};

const updateOptions = {
  title,
  ...sharedOptions,
};

export { createOptions, updateOptions };
