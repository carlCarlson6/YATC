import { expect, test } from 'vitest';
import { checkIfFollowingWithDrizzle } from 'src/server/user/follows/checkIfFollowing';
import { followsTable } from 'src/server/user/follows/follow.drizzle.schema';
import { followUser, storeFollowerOnDrizzle } from 'src/server/user/follows/follow/followUser';
import { setupDockerTestDb } from 'test/helpers/setupTestingDb';

test("GivenUser_WhenFollowAnotherUser_ThenFollowingCountIncreases", async () => {
  const userId = "some-user-id";
  const userToFollow = "some-user-id-who-is-followed";
  const {db} = await setupDockerTestDb();

  await followUser({
    checkIfFollowing: checkIfFollowingWithDrizzle(db),
    storeFollower: storeFollowerOnDrizzle(db)
  })(userId, userToFollow);

  const count = (await db.query.followsTable.findMany().execute()).length;
  expect(count).toBe(1);
});

test("GivenUser_WhenFollowAnotherUser_ThenAFollowIsStored", async () => {
  const userId = "some-user-id";
  const userToFollow = "some-user-id-who-is-followed";
  const {db} = await setupDockerTestDb();

  await followUser({
    checkIfFollowing: checkIfFollowingWithDrizzle(db),
    storeFollower: storeFollowerOnDrizzle(db)
  })(userId, userToFollow);

  const follow = await db.select({ userId: followsTable.userId, whoIsFollowed: followsTable.isFollowingUserId })
    .from(followsTable)
    .execute();
  expect(follow).toMatchSnapshot();
});