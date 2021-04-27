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
$description:String
$techTags:[String!]`;

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

type useUpdateProjectReturn = {
  update: (x: {
    variables: {
      id: number;
      title?: string;
      href?: string;
      tags?: string[];
      imgUrl?: string;
      github?: string;
      description?: string;
      techTags?: string[];
    };
  }) => void;
};

const useUpdateProject = (): useUpdateProjectReturn => {
  const a: any = {};
  const [update, { data, error }] = useMutation(MUTATION_UPDATE, {
    update(cache: any, m_result: any, m_id: any) {
      const { updateProject } = m_result.data;
      const feed = readFeed(cache);

      const index = feed.findIndex((x: Project) => x.id === updateProject.id);
      const new_data = {
        feed: [
          ...feed.slice(0, index),
          updateProject,
          ...feed.slice(index + 1),
        ],
      };
      writeFeed(cache, new_data);
    },
    ...a,
  });

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return { update };
};

export default useUpdateProject;
