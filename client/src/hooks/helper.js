import { FeedQueryAndVars } from "./useFeed";
const readFeed = (cache) => {
  const data = cache.readQuery({
    ...FeedQueryAndVars,
  });

  const feed = data.feed;
  return feed;
};

const writeFeed = (cache, data) => {
  cache.writeQuery({
    ...FeedQueryAndVars,
    data,
  });
};

export { readFeed, writeFeed };
