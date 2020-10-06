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
const useCreateProject = (props) => {
  const [createProject, { error, data }] = useMutation(ADDProject_Mutation, {
    update(cache, m_result, m_id) {
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
      alert(error);
    }
  }, [error]);

  return { createProject };
};

export default useCreateProject;
