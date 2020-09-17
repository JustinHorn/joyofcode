import React from "react";

import { useGetImageMutation } from "hooks";
import { MutationFormWithoutState } from "component/MutationForm";

const Edit = ({ props }) => {
  const setImage = (url) => {
    props.setFormValue("imgUrl", url);
  };

  return (
    <div className="edit">
      <GenerateImageFromHref
        href={props.formValues.href.value}
        setImage={setImage}
      />
      (takes a few seconds)
      <MutationFormWithoutState headline="create" {...props} />
    </div>
  );
};

const GenerateImageFromHref = ({ setImage, href }) => {
  const preview = useGetImageMutation(setImage);

  return (
    <button onClick={() => preview(href)}>generate Image from href</button>
  );
};

export default Edit;