import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

import { projectQuery, formatValsFromLines } from "forms";

import { readFeed, writeFeed } from "../helper";

const values = `$title: String!
$href: String!
$tags: [String!]!
$description:String
$imgUrl: String
$github: String
$techTags:[String!]`;

const ADDProject_Mutation = gql`
  mutation addProject(
    ${values}
  ) {
    addProject(
        ${formatValsFromLines(values)}
    ) {
      ${projectQuery}
    }
  }
`;

type useCreateProjectProps = any;
type useCreateProjectReturn = {
  createProject: (obj: {
    variables: {
      title: string;
      tags: string[];
      description?: string;
      imgUrl?: string;
      github?: string;
      techTags?: string[];
    };
  }) => void;
};

const useCreateProject = (
  props: useCreateProjectProps
): useCreateProjectReturn => {
  const [createProject, { error, data }] = useMutation(ADDProject_Mutation, {
    update(cache: any, m_result: any, m_id: any) {
      const { addProject } = m_result.data;
      const feed = readFeed(cache);

      const new_data = {
        feed: [addProject, ...feed],
      };
      writeFeed(cache, new_data);
    },
    ...props,
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      alert(error);
    }
  }, [error]);

  return { createProject };
};

export default useCreateProject;
