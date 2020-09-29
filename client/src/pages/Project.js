import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Resource from "component/Resource";

import UserContext from "context";

import CommentSection from "Section/Comment";
import ResourceUpdatePopup from "component/Resource/ResourceUpdatePopup";

import DeleteHandler from "component/DeleteHandler";

import useProject from "hooks/useProject";

const ProjectPage = () => {
  let { id } = useParams();
  id = Number(id);

  const { loading, data, error } = useProject(id);

  const [isUpdate, setUpdate] = useState(false);

  const { user } = useContext(UserContext);
  const postedByCurrentUser = data?.project.postedBy.id === user?.id && user;

  if (loading) return "loading";
  if (error) {
    throw error;
    return "error";
  }
  return (
    <div>
      {postedByCurrentUser && (
        <button onClick={() => setUpdate(!isUpdate)}>edit</button>
      )}

      {postedByCurrentUser && <DeleteHandler resourceId={id}></DeleteHandler>}

      <Resource {...data?.project}></Resource>
      <CommentSection resourceId={id} />

      <ResourceUpdatePopup
        show={isUpdate}
        onClickAway={() => setUpdate(false)}
        resourceValues={data?.project}
      />
    </div>
  );
};

export default ProjectPage;
