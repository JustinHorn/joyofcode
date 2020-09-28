import React, { useContext } from "react";
import {
  useHandleFormValues,
  MutationOptions,
} from "component/Forms/MutationForm";

import { createOptions as options } from "forms/Options";

import { useCreateResource } from "hooks";

import UserContext from "context";
import MutationMenu from "component/MutationMenu";

const Post = () => {
  const { user } = useContext(UserContext);

  const props = useHandleFormValues(options);

  const { createResource: mutation } = useCreateResource(props.resetFormValues);

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
