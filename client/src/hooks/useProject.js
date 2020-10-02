import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";

import { resourceQuery, comment } from "forms";
import Resource from "component/Resource";

import UserContext from "context";

import CommentSection from "section/Comment";
import ResourceUpdatePopup from "component/Resource/ResourceUpdatePopup";

import useDeleteResource from "hooks/resource/useDelete";

import DeleteHandler from "component/DeleteHandler";

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

const useProject = (id) => {
  const { loading, data, error } = useQuery(QUERY_PROJECT, {
    variables: { id },
  });

  return { loading, data, error };
};

export default useProject;
