import { FeedQueryAndVars } from "./useFeed";
const readFeed = (cache) => {
  const data = cache.readQuery({
    ...FeedQueryAndVars,
  });
  console.log("data");
  console.log(data);

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
