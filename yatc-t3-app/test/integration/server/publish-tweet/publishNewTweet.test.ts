import { expect,vi, test } from 'vitest';
import { publishNewTweet, storeTweetWithDrizzle } from 'src/server/publish-tweet/publishNewTweet';
import { TweetEntity } from 'src/server/publish-tweet/tweet.drizzle.schema';
import { setupDockerTestDb } from 'test/helpers/setupTestingDb';

test("GivenTweet_WhenPublishTweet_ThenANewTweetIsReturned", async () => {
  const {db} = await setupDockerTestDb();
  
  const newTweet = await publishNewTweet({
    storeTweet: storeTweetWithDrizzle(db),
    sendNewTweetPublished: vi.fn((_: TweetEntity) => Promise.resolve())
  })({ id: "some-user-id", name: "some-user", avatar: "some-image.png" }, "some-text");

  expect(newTweet).toMatchSnapshot({id: expect.any(String)})
});

test("GivenTweet_WhenPublishTweet_ThenANewTweetIsStored", async () => {
  const {db} = await setupDockerTestDb();

  await publishNewTweet({
    storeTweet: storeTweetWithDrizzle(db),
    sendNewTweetPublished: vi.fn((_: TweetEntity) => Promise.resolve())
  })({ id: "some-user-id", name: "some-user", avatar: "some-image.png" }, "some-text");
  
  const storedTweet = await db.query.tweetsTable.findFirst().execute();
  expect(storedTweet).toMatchSnapshot({id: expect.any(String)})
});

test("GivenTweet_WhenPublishTweet_ThenSendNewTweetPublishedIsCalled", async () => {
  const {db} = await setupDockerTestDb();
  const sendNewTweetPublished =  vi.fn((tweet: TweetEntity) => Promise.resolve());

  await publishNewTweet({
    storeTweet: storeTweetWithDrizzle(db),
    sendNewTweetPublished
  })({ id: "some-user-id", name: "some-user", avatar: "some-image.png" }, "some-text");

  expect(sendNewTweetPublished).toHaveBeenCalledTimes(1);
});