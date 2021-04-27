import React, { useContext } from "react";
import { useHandleFormValues } from "component/forms/MutationForm";

import { createOptions as options } from "forms/Options";

import useCreateProject from "hooks/project/useCreate";

import UserContext from "context";
import MutationMenu from "component/MutationMenu";
import { useHistory } from "react-router-dom";

const PostPage = () => {
  const { user } = useContext(UserContext);

  const props = useHandleFormValues(options);
  const history = useHistory();
  const onCompleted = (data) => {
    const project = data.addProject;

    props.resetFormValues();

    if (
      window.confirm(`Project ${project.title} has been posted. Wanna view it?`)
    ) {
      history.push("/project/" + project.id);
    }
  };

  const { createProject: mutation } = useCreateProject({ onCompleted });

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

export default PostPage;
