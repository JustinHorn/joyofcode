import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Project from "component/Project";

import UserContext from "context";

import CommentSection from "section/Comment";
import ProjectUpdatePopup from "component/Project/ProjectUpdatePopup";

import DeleteHandler from "component/DeleteHandler";

import useProject from "hooks/useProject";

import useHandleQuery from "helper/useHandleQuery";

const ProjectPage = ({ query }) => {
  let { id } = useParams();
  id = Number(id);

  const { data } = query;

  const [isUpdate, setUpdate] = useState(false);

  const { user } = useContext(UserContext);
  const postedByCurrentUser = data?.project.postedBy.id === user?.id && user;

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

export default (props) => {
  let { id } = useParams();
  id = Number(id);
  return useHandleQuery(props, useProject, ProjectPage, id);
};
