import { useEffect } from "react";
import { useMutation ,gql} from "@apollo/client";

import { resourceQuery, formatValsFromLines } from "forms";

import { readFeed, writeFeed } from "../helper";

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

const mutation_unlikeResource = gql`
  mutation addResource(
    ${values}
  ) {
    unlikeResource(
        ${formatValsFromLines(values)}
    ) 
  }
`;

const useLikeResource = (like) => {
  const [likeResource, { error }] = useMutation(
    like ? mutation_likeResource : mutation_unlikeResource,
    {
      update: update(like),
    }
  );

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return { likeResource };
};

const update = (like) => (cache, m_result, m_id) => {
  const feed = readFeed(cache);
  let r;
  if (like) {
    r = update_like(feed, m_result, m_id);
  } else {
    r = update_unlike(feed, m_result, m_id);
  }
  const { index, new_resource } = r;
  const new_data = {
    feed: [...feed.slice(0, index), new_resource, ...feed.slice(index + 1)],
  };
  writeFeed(cache, new_data);
};

const update_like = (feed, m_result, m_id) => {
  const {
    likeResource: { resource },
  } = m_result.data;

  const index = feed.findIndex((x) => x.id === resource.id);
  return { index, new_resource: resource };
};

const update_unlike = (feed, m_result, m_id) => {
  const { unlikeResource: likeId } = m_result.data;

  const index = feed.findIndex(
    (x) => x.likes.findIndex((l) => l.id === likeId) > -1
  );

  const new_resource = shallowCopy(feed[index]);
  const new_likes = new_resource.likes;

  const likeIndex = new_likes.findIndex((l) => l.id === likeId);
  new_resource.likes = deleteElement(likeIndex, new_likes);

  decrementValue(new_resource, "likeCount");

  return { index, new_resource };
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

export default useLikeResource;
