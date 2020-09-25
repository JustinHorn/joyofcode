import React, { useContext } from "react";
import Resource from "component/Resource";
import UserContext from "context";

const Preview = ({ formValues }) => {
  const values = {};

  Object.keys(formValues).forEach((k) => (values[k] = formValues[k].value));

  const tags = values.tags.map((x) => ({
    name: x,
  }));
  const { user } = useContext(UserContext);

  return (
    <div className="preview">
      <Resource
        preview={true}
        {...values}
        tags={tags}
        comments={[]}
        date={Date.now()}
        postedBy={{ name: user?.name }}
      />
    </div>
  );
};

export default Preview;
