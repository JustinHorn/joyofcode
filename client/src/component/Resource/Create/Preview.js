import React, { useContext } from "react";
import Resource from "component/Resource";
import UserContext from "context";

const Preview = ({ formValues }) => {
  const values = {};

  Object.keys(formValues).forEach((k) => (values[k] = formValues[k].value));

  const tags = values.tags.split(",").map((n) => ({ name: n }));

  const { user } = useContext(UserContext);

  return (
    <div className="preview">
      <h4>Preview:</h4>
      <Resource
        {...values}
        tags={tags}
        date={Date.now()}
        postedBy={{ name: user.name }}
      />
    </div>
  );
};

export default Preview;