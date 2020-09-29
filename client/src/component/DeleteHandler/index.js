import React, { useContext, useState, useEffect } from "react";

import useDeleteResource from "hooks/useDeleteResource";

import { useHistory } from "react-router-dom";

const DeleteHandler = ({ resourceId }) => {
  const history = useHistory();

  const { deleteResource, error } = useDeleteResource({
    onCompleted: (data) => {
      const { id, title } = data.deleteResource;
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
      deleteResource({ variables: { id: resourceId } });
    }
  };

  return <button onClick={deleteOnClick}>Delete</button>;
};

export default DeleteHandler;
