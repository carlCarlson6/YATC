import type { DrizzleDb } from "../infrastructure/drizzle";
import { tweets, type TweetEntity } from "./tweet.drizzle.schema";

export const saveNewTweet = ({storeTweet, sendNewTweetPublished}: {
  storeTweet: (tweet: TweetEntity) => Promise<void>,
  sendNewTweetPublished: (tweet: TweetEntity) => Promise<void>,
}) => async (
  userPublisher: { id: string; name: string; avatar: string; },
  tweetText: string
) => {
  const tweet = {
    id: crypto.randomUUID(),
    text: tweetText,
    publishedBy: userPublisher.id,
    publishedAt: Date.now()/1000,
  };

  await storeTweet(tweet);
  await sendNewTweetPublished(tweet);

  return ({
    ...tweet,
    user: userPublisher
  });
};

export const storeTweetWithDrizzle = (db: DrizzleDb) => async (tweet: TweetEntity) => {
  await db.insert(tweets).values(tweet).execute();
}