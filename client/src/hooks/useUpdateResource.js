import { useEffect } from "react";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

import { FeedQueryAndVars } from "component/Feed";
import { resourceQuery } from "forms";

import { formatValsFromLines } from "forms";

import { readFeed, writeFeed } from "./helper";

const values = `$id: Int!
$title: String
$href:String
$tags: [String!]
$imgUrl: String
$github: String
$description:String`;

const MUTATION_UPDATE = gql`
  mutation updateResource(
    ${values}
  ) {
    updateResource(
      ${formatValsFromLines(values)}
    ) {
      ${resourceQuery}
    }
  }
`;

const useUpdateResource = () => {
  const [update, { data, error }] = useMutation(MUTATION_UPDATE, {
    update(cache, m_result, m_id) {
      const { updateResource } = m_result.data;
      const feed = readFeed(cache);

      const index = feed.findIndex((x) => x.id === updateResource.id);
      const new_data = {
        feed: [
          ...feed.slice(0, index),
          updateResource,
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

export default useUpdateResource;
