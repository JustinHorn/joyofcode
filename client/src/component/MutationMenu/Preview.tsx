import React, { useContext } from "react";
import Project from "component/Project";
import UserContext from "context/UserContext";

import iconList from "data";

type PreviewProps = {
  formValues: any;
};

const Preview = ({ formValues }: PreviewProps) => {
  const values: any = {};

  Object.keys(formValues).forEach((k) => (values[k] = formValues[k].value));

  const tags = values.tags.map((x: string) => ({
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
