import { expect, test } from 'vitest';
import { randomUUID } from "crypto";
import { setupDockerTestDb } from "test/helpers/setupTestingDb";
import { countFollowersOnDrizzle, countFollowingOnDrizzle } from "src/server/user/follows/counting";
import { followsTable } from 'src/server/user/follows/follows.drizzle.schema';

test("GiveUser_With4Followers_WhenCountFollowers_ThenReturns4", async () =>{
  const userId = "024a0448-10d8-4a9b-9b0d-0c55caccd4c4";
  const {db} = await setupDockerTestDb();
  await Promise.all([1,2,3,4].map(idx => db.insert(followsTable).values({
    id: randomUUID(),
    userId: `follower-${idx}`,
    isFollowingUserId: userId
  }).execute()));

  const count = await countFollowersOnDrizzle(db)(userId);

  expect(count).toBe(4);
});

test("GiveUser_Following4Users_WhenCountFollowing_ThenReturns4", async () => {
  const userId = "024a0448-10d8-4a9b-9b0d-0c55caccd4c4";
  const {db} = await setupDockerTestDb();
  await Promise.all([1,2,3,4].map(idx => db.insert(followsTable).values({
    id: randomUUID(),
    userId: userId,
    isFollowingUserId: `following-${idx}`
  }).execute()));

  const count = await countFollowingOnDrizzle(db)(userId);

  expect(count).toBe(4);
})