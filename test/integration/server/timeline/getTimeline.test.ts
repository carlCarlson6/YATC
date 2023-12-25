import { expect, test } from 'vitest';
import { setupDockerTestDb } from "test/helpers/setupTestingDb";
import { getTimeline } from 'src/server/timeline/getTimeline';
import { buildTimelineFromDb } from 'src/server/timeline/buildTimeline';
import { addUserData } from 'src/server/timeline/addUserData';
import { emojisTable } from 'src/server/emojeets/publish/emojis.drizzle.schema';
import { DrizzleDb } from 'src/server/infrastructure/drizzle';
import { usersTable } from 'src/server/infrastructure/drizzle/base.drizzle.schema';
import { User } from 'src/server/user/profile/userProfile.drizzle.schema';
import { emojisReactionsTable } from 'src/server/emojeets/react/emojisReactions.drizzle.schema';

const userId = "024a0448-10d8-4a9b-9b0d-0c55caccd4c4";

const getUserTimeline = async (db: DrizzleDb) => await getTimeline({
  fetchEmojeets: buildTimelineFromDb(db),
  addUserData: addUserData(db)
})(userId);

const withUser = (db: DrizzleDb, user: User) => db.insert(usersTable).values({
  id: user.id,
  name: user.name,
  email: `${user.name}@mail.com`,
  image: user.avatar
}).execute();

test("GivenUserWithSomeEmojeets_WhenGetTimeline_ThenTimelineIsReturned", async () => {
  const {db} = await setupDockerTestDb();
  await withUser(db, {id: userId, name: "some-user-name", avatar: "some-user-image"});
  await db.insert(emojisTable).values([
    {
      id:           "277cc7a2-2b75-4303-9179-1538360f8239",
      emoji:        "🐹",
      publishedAt:  "0",
      publishedBy:  userId
    },
    {
      id:           "bf2c6da7-aa5c-43fd-9a3b-9fd0f2650ec4",
      emoji:        "🐱",
      publishedAt:  "1",
      publishedBy:  userId
    }
  ]).execute();

  const timeline = await getUserTimeline(db);
  expect(timeline).toMatchSnapshot();
});

test("GivenUserWithEmojeetWithReactions_WhenGetTimeline_ThenTimelineWithReactionsIsReturned", async () => {
  const {db} = await setupDockerTestDb();
  await withUser(db, {id: userId, name: "some-user-name", avatar: "some-user-image"});
  await db.insert(emojisTable).values({
    id:           "277cc7a2-2b75-4303-9179-1538360f8239",
    emoji:        "🐹",
    publishedAt:  "0",
    publishedBy:  userId
  }).execute();
  await db.insert(emojisReactionsTable).values([
    {
      id:           "eea498ae-b8dd-4102-9575-6618f4327f9d",
      reaction:     "🧀",
      reactsTo:     "277cc7a2-2b75-4303-9179-1538360f8239",
      publishedAt:  "1",
      publishedBy:  userId
    },
    {
      id:           "2df9f46d-e865-4737-8050-fb5c3e8b0046",
      reaction:     "🍕",
      reactsTo:     "277cc7a2-2b75-4303-9179-1538360f8239",
      publishedAt:  "2",
      publishedBy:  userId
    },
  ]).execute();

  const timeline = await getUserTimeline(db);
  expect(timeline).toMatchSnapshot();
});