import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";

import { resourceQuery, comment } from "forms";
import Resource from "component/Resource";

import UserContext from "context";

import CommentSection from "Section/Comment";
import ResourceUpdatePopup from "component/Resource/ResourceUpdatePopup";

import useDeleteResource from "hooks/useDeleteResource";

const QUERY_PROJECT = gql`
  query QUERY_PROJECT($id:Int!) {
      project(id:$id) {
          ${resourceQuery}
          comments {
            ${comment}
          }
      }
  }
`;

const ProjectPage = () => {
  let { id } = useParams();
  id = Number(id);

  const [isUpdate, setUpdate] = useState(false);

  const { loading, data, error } = useQuery(QUERY_PROJECT, {
    variables: { id },
  });

  const { user } = useContext(UserContext);
  const postedByCurrentUser = data?.project.postedBy.id === user?.id && user;

  const { deleteResource } = useDeleteResource();

  const deleteOnClick = () => {
    if (window.confirm("You really wanna delete?")) {
      deleteResource({ variables: { id } });
    }
  };

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

      {postedByCurrentUser && <button onClick={deleteOnClick}>Delete</button>}

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
