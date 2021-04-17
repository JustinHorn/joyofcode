import React, { useContext, useState, useEffect } from "react";

import useDeleteProject from "hooks/project/useDelete";

import { useHistory } from "react-router-dom";

type DeleteHandlerProps = {
  projectId: number;
};

const DeleteHandler = ({ projectId }: DeleteHandlerProps) => {
  const history = useHistory();

  const { deleteProject, error } = useDeleteProject({
    onCompleted: (data: any) => {
      const { id, title } = data.deleteProject;
      alert(`Project ${title} was deleted`);
      history.push("/");
    },
  });

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const deleteOnClick = () => {
    if (window.confirm("You really wanna delete?")) {
      deleteProject({ variables: { id: projectId } });
    }
  };

  return <button onClick={deleteOnClick}>Delete</button>;
};

export default DeleteHandler;
