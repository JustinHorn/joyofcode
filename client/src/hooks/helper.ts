import { FeedQueryAndVars } from "./useFeed";




type readFeedFunction =  (cache:any) => any


const readFeed:readFeedFunction = (cache) => {
  const data = cache.readQuery({
    ...FeedQueryAndVars,
  });

  const feed = data.feed;
  return feed;
};

type writeFeedFunction =  (cache:any,data:any) => any


const writeFeed: writeFeedFunction = (cache, data) => {
  cache.writeQuery({
    ...FeedQueryAndVars,
    data,
  });
};

export { readFeed, writeFeed };
