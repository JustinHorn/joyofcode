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

const useLikeProject = (liked) => {
  const [likeProject, { error, loading }] = useMutation(mutation_likeProject, {
    update: (cache, m_result, m_id) => {
      const feed = readFeed(cache);
      let r;

      r = update_like(feed, m_result, m_id);

      const { index, new_project } = r;
      const new_data = {
        feed: [...feed.slice(0, index), new_project, ...feed.slice(index + 1)],
      };
      writeFeed(cache, new_data);
    },
  });

  const [unlikeProject, { unlikeError, unlikeLoading }] = useMutation(
    mutation_unlikeProject,
    {
      update: (cache, m_result, m_id) => {
        const feed = readFeed(cache);
        let r;

        r = update_unlike(feed, m_result, m_id);

        const { index, new_project } = r;
        const new_data = {
          feed: [
            ...feed.slice(0, index),
            new_project,
            ...feed.slice(index + 1),
          ],
        };
        writeFeed(cache, new_data);
      },
    }
  );

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (unlikeError) {
      alert(unlikeError);
    }
  }, [unlikeError]);

  const toggleLikeProject = liked ? unlikeProject : likeProject;

  return { toggleLikeProject, unlikeProject, likeProject, error, loading };
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

  const new_project = { ...feed[index] };
  const new_likes = new_project.likes;

  const likeIndex = new_likes.findIndex((l) => l.id === likeId);
  new_project.likes = deleteElement(likeIndex, new_likes);

  new_project.likeCount -= 1;

  return { index, new_project };
};

const deleteElement = (index, arr) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
];

export default useLikeProject;
