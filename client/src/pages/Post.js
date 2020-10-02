import React, { useContext } from "react";
import { useHandleFormValues } from "component/forms/MutationForm";

import { createOptions as options } from "forms/Options";

import useCreateResource from "hooks/resource/useCreate";

import UserContext from "context";
import MutationMenu from "component/MutationMenu";
import { useHistory } from "react-router-dom";

const Post = () => {
  const { user } = useContext(UserContext);

  const props = useHandleFormValues(options);
  const history = useHistory();
  const onCompleted = (data) => {
    const resource = data.addResource;

    props.resetFormValues();

    if (
      window.confirm(
        `Resource ${resource.title} has been posted. Wanna view it?`
      )
    ) {
      history.push("/project/" + resource.id);
    }
  };

  const { createResource: mutation } = useCreateResource({ onCompleted });

  return (
    <>
      {!user && <h1>login or register to share your project</h1>}

      {user && (
        <MutationMenu
          options={options}
          mutation={mutation}
          headline={"Share your project!"}
          props={props}
        />
      )}
    </>
  );
};

export default Post;
