import { useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

import { FeedQueryAndVars } from "component/Feed";

import { resourceQuery, formatValsFromLines } from "gql";

const values = `$id: Int!`;

const mutation_likeResource = gql`
  mutation addResource(
    ${values}
  ) {
    likeResource(
        ${formatValsFromLines(values)}
    ) {
      resource {
        ${resourceQuery}
      }
    }
  }
`;

export const useLikeResource = () => {
  const [likeResource, { error, data }] = useMutation(mutation_likeResource, {
    update(cache, m_result, m_id) {
      const {
        likeResource: { resource },
      } = m_result.data;

      const data = cache.readQuery({
        ...FeedQueryAndVars,
      });
      const feed = data.feed;
      const index = feed.findIndex((x) => x.id === resource.id);
      const new_data = {
        feed: [...feed.slice(0, index), resource, ...feed.slice(index + 1)],
      };
      cache.writeQuery({
        ...FeedQueryAndVars,
        data: new_data,
      });
    },
  });

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return { likeResource };
};

const mutation_unlikeResource = gql`
  mutation addResource(
    ${values}
  ) {
    unlikeResource(
        ${formatValsFromLines(values)}
    ) 
  }
`;

export const useUnLikeResource = () => {
  const [unlikeResource, { error, data }] = useMutation(
    mutation_unlikeResource,
    {
      update(cache, m_result, m_id) {
        const { unlikeResource: likeId } = m_result.data;

        const data = cache.readQuery({
          ...FeedQueryAndVars,
        });
        const feed = data.feed;

        const index = feed.findIndex(
          (x) => x.likes.findIndex((l) => l.id === likeId) > -1
        );

        const new_resource = { ...feed[index] };
        const new_likes = new_resource.likes;

        const likeIndex = new_likes.findIndex((l) => l.id === likeId);
        new_resource.likes = [
          ...new_likes.slice(0, likeIndex),
          ...new_likes.slice(likeIndex + 1),
        ];

        new_resource.likeCount = new_resource.likeCount - 1;
        const new_data = {
          feed: [
            ...feed.slice(0, index),
            new_resource,
            ...feed.slice(index + 1),
          ],
        };
        cache.writeQuery({
          ...FeedQueryAndVars,
          data: new_data,
        });
      },
    }
  );

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return { unlikeResource };
};
