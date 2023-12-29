import { expect, test } from 'vitest';
import { checkIfFollowingWithDrizzle } from 'src/server/user/follows/checkIfFollowing';
import { setupDockerTestDb } from 'test/helpers/setupTestingDb';
import { followsTable } from 'src/server/user/follows/follows.drizzle.schema';
import { followUser, storeFollowerOnDrizzle } from 'src/server/user/follows/follow/followUser';
import { mockAuthValidator } from '../../../../../helpers/mockAuthValidator';

const userId = "some-user-id";
const user = {
  id: userId,
  name: "some-user-name",
  avatar: "some-avatar"
}

test("GivenUser_WhenFollowAnotherUser_ThenFollowingCountIncreases", async () => {
  const userToFollow = "some-user-id-who-is-followed";
  const {db} = await setupDockerTestDb();

  await followUser({
    checkIfFollowing: checkIfFollowingWithDrizzle(db),
    storeFollower: storeFollowerOnDrizzle(db),
    auth: mockAuthValidator(user)
  })({userToFollow});

  const count = (await db.query.followsTable.findMany().execute()).length;
  expect(count).toBe(1);
});

test("GivenUser_WhenFollowAnotherUser_ThenAFollowIsStored", async () => {
  const userToFollow = "some-user-id-who-is-followed";
  const {db} = await setupDockerTestDb();

  await followUser({
    checkIfFollowing: checkIfFollowingWithDrizzle(db),
    storeFollower: storeFollowerOnDrizzle(db),
    auth: mockAuthValidator(user)
  })({userToFollow});

  const follow = await db.select({ userId: followsTable.userId, whoIsFollowed: followsTable.isFollowingUserId })
    .from(followsTable)
    .execute();
  expect(follow).toMatchSnapshot();
});