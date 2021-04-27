import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";

import Project from "component/Project";

import UserContext from "context/UserContext";

import CommentSection from "section/Comment";
import ProjectUpdatePopup from "component/Project/ProjectUpdatePopup";

import DeleteHandler from "component/DeleteHandler";

import useProject from "hooks/useProject";

import useHandleQuery from "helper/useHandleQuery";

import styles from "./styles/projectPage.module.css";

const ProjectPage = ({ query }) => {
  let { id } = useParams();

  id = Number(id);

  const { data } = query;

  const [isUpdate, setUpdate] = useState(false);

  const { user } = useContext(UserContext);
  const postedByCurrentUser = data?.project?.postedBy.id === user?.id && user;

  return (
    <div className={""}>
      {postedByCurrentUser && (
        <button onClick={() => setUpdate(!isUpdate)}>edit</button>
      )}

      {postedByCurrentUser && <DeleteHandler projectId={id} />}

      {data && (
        <div className={styles.page}>
          <div className={styles.flex}>
            <CommentSection projectId={id} />
          </div>
          <Project {...data?.project} showDescription={true} />
          <ProjectUpdatePopup
            show={isUpdate}
            onClickAway={() => setUpdate(false)}
            projectValues={data?.project}
          />
        </div>
      )}
      <hr />
    </div>
  );
};

export default (props) => {
  let { id } = useParams();
  id = Number(id);

  return useHandleQuery(props, useProject, ProjectPage, id);
};
