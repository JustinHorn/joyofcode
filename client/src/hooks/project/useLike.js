import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

import { projectQuery, formatValsFromLines } from "forms";

import { readFeed, writeFeed } from "../helper";

const values = `$id: Int!`;

const mutation_likeProject = gql`
  mutation addProject(
    ${values}
  ) {
    likeProject(
        ${formatValsFromLines(values)}
    ) {
      project {
        ${projectQuery}
      }
    }
  }
`;

const mutation_unlikeProject = gql`
  mutation addProject(
    ${values}
  ) {
    unlikeProject(
        ${formatValsFromLines(values)}
    ) 
  }
`;

const useLikeProject = (like) => {
  const [likeProject, { error }] = useMutation(
    like ? mutation_likeProject : mutation_unlikeProject,
    {
      update: update(like),
    }
  );

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return { likeProject };
};

const update = (like) => (cache, m_result, m_id) => {
  const feed = readFeed(cache);
  let r;
  if (like) {
    r = update_like(feed, m_result, m_id);
  } else {
    r = update_unlike(feed, m_result, m_id);
  }
  const { index, new_project } = r;
  const new_data = {
    feed: [...feed.slice(0, index), new_project, ...feed.slice(index + 1)],
  };
  writeFeed(cache, new_data);
};

const update_like = (feed, m_result, m_id) => {
  const {
    likeProject: { project },
  } = m_result.data;

  const index = feed.findIndex((x) => x.id === project.id);
  return { index, new_project: project };
};

const update_unlike = (feed, m_result, m_id) => {
  const { unlikeProject: likeId } = m_result.data;

  const index = feed.findIndex(
    (x) => x.likes.findIndex((l) => l.id === likeId) > -1
  );

  const new_project = shallowCopy(feed[index]);
  const new_likes = new_project.likes;

  const likeIndex = new_likes.findIndex((l) => l.id === likeId);
  new_project.likes = deleteElement(likeIndex, new_likes);

  decrementValue(new_project, "likeCount");

  return { index, new_project };
};

const shallowCopy = (obj) => {
  return { ...obj };
};

const decrementValue = (obj, value) => {
  obj[value] -= 1;
};

const deleteElement = (index, arr) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
];

export default useLikeProject;
