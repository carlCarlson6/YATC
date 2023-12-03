import type { DrizzleDb } from "../infrastructure/drizzle";
import type { QStashPublisher } from "../infrastructure/qstash";
import type { User } from "../user/user";
import { tweetsTable, type TweetEntity } from "./tweet.drizzle.schema";

export const publishNewTweet = ({storeTweet, sendNewTweetPublished}: {
  storeTweet: (tweet: TweetEntity) => Promise<void>,
  sendNewTweetPublished: (tweet: TweetEntity) => Promise<void>,
}) => async (
  userPublisher: User,
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
  await db.insert(tweetsTable).values(tweet).execute();
}

export const sendNewTweetPublishedWithQStash = (qstash: QStashPublisher, appUrl: string) => async (tweet: TweetEntity) => {
  console.log("publishing event", "tweet-published", "to", `${appUrl}/api/qstash`);
  const result = await qstash(`${appUrl}/api/qstash`, {
    type: "tweet-published",
    payload: JSON.stringify({ tweetId: tweet.id, publishedBy: tweet.publishedBy })
  });
  console.log("result of send message", result);
}