import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Project from "component/Project";

import UserContext from "context";

import CommentSection from "section/Comment";
import ProjectUpdatePopup from "component/Project/ProjectUpdatePopup";

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
  }
  return (
    <div>
      {postedByCurrentUser && (
        <button onClick={() => setUpdate(!isUpdate)}>edit</button>
      )}

      {postedByCurrentUser && <DeleteHandler projectId={id}></DeleteHandler>}

      <Project {...data?.project} showDescription={true}></Project>
      <CommentSection projectId={id} />

      <ProjectUpdatePopup
        show={isUpdate}
        onClickAway={() => setUpdate(false)}
        projectValues={data?.project}
      />
    </div>
  );
};

export default ProjectPage;
