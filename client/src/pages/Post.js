import React, { useContext } from "react";
import { useHandleFormValues, MutationOptions } from "component/MutationForm";

import { createOptions as options } from "component/MutationForm";

import { useCreateResource } from "hooks";

import UserContext from "context";
import MutationMenu from "component/MutationMenu";

const Post = () => {
  const { user } = useContext(UserContext);

  const MO = new MutationOptions(options);

  const props = useHandleFormValues(options);

  const { createResource: mutation } = useCreateResource(props.resetFormValues);

  return (
    <>
      {!user && <h1>login or register to share your project</h1>}

      {user && (
        <MutationMenu
          MO={MO}
          mutation={mutation}
          headline={"Share your project!"}
          props={props}
        />
      )}
    </>
  );
};

export default Post;
