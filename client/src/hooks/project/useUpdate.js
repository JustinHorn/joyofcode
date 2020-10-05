import { useEffect } from "react";

import { useMutation, gql } from "@apollo/client";

import { projectQuery } from "forms";

import { formatValsFromLines } from "forms";

import { readFeed, writeFeed } from "../helper";

const values = `$id: Int!
$title: String
$href:String
$tags: [String!]
$imgUrl: String
$github: String
$description:String`;

const MUTATION_UPDATE = gql`
  mutation updateProject(
    ${values}
  ) {
    updateProject(
      ${formatValsFromLines(values)}
    ) {
      ${projectQuery}
    }
  }
`;

const useUpdateProject = () => {
  const [update, { data, error }] = useMutation(MUTATION_UPDATE, {
    update(cache, m_result, m_id) {
      const { updateProject } = m_result.data;
      const feed = readFeed(cache);

      const index = feed.findIndex((x) => x.id === updateProject.id);
      const new_data = {
        feed: [
          ...feed.slice(0, index),
          updateProject,
          ...feed.slice(index + 1),
        ],
      };
      writeFeed(cache, new_data);
    },
  });

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return { update };
};

export default useUpdateProject;
