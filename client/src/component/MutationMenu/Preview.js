import React, { useContext } from "react";
import Project from "component/Project";
import UserContext from "context";

import iconList from "data";

const Preview = ({ formValues }) => {
  const values = {};

  Object.keys(formValues).forEach((k) => (values[k] = formValues[k].value));

  const tags = values.tags.map((x) => ({
    name: x,
  }));
  const { user } = useContext(UserContext);

  return (
    <div className="preview">
      <Project
        preview={true}
        {...values}
        tags={tags}
        comments={[]}
        date={Date.now()}
        postedBy={{ name: user?.name }}
        showDescription={true}
      />
    </div>
  );
};

export default Preview;
