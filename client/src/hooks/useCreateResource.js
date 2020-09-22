import { useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

import { resourceQuery, formatValsFromLines } from "gql";

import { readFeed, writeFeed } from "./helper";

const values = `$title: String!
$href: String!
$tags: [String!]!
$imgUrl: String
$github: String`;

const ADDResource_Mutation = gql`
  mutation addResource(
    ${values}
  ) {
    addResource(
        ${formatValsFromLines(values)}
    ) {
      ${resourceQuery}
    }
  }
`;
const useCreateResource = (onSuccess) => {
  const [createResource, { error, data }] = useMutation(ADDResource_Mutation, {
    update(cache, m_result, m_id) {
      const { addResource } = m_result.data;
      const feed = readFeed(cache);

      const new_data = {
        feed: [addResource, ...feed],
      };
      writeFeed(cache, new_data);

      onSuccess();
    },
  });

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return { createResource };
};

export default useCreateResource;
