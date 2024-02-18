import { DrizzleDb } from 'src/server/infrastructure/drizzle';
import { checkUserNameIsAvailable } from 'src/server/user/profile/checkUserNameIsAvailableAction';
import { User, userProfileTable } from 'src/server/user/profile/userProfile.drizzle.schema';
import { setupDockerTestDb } from 'test/helpers/setupTestingDb';
import { withUser } from 'test/helpers/withUser';
import { expect, test } from 'vitest';
import { as } from 'vitest/dist/reporters-5f784f42.js';

const userId = '024a0448-10d8-4a9b-9b0d-0c55caccd4c4';
const discordHandle = 'adCarl';
const userProfileName = 'carlo';

const anotherUserId = '09db087b-c88b-4a77-b8ed-ab3ac422aac1'

const user = {
  id: userId, 
  name: discordHandle, 
  avatar: 'some-image'
}

const withUserProfile = (db: DrizzleDb, user: Omit<User, 'avatar'>) => db.insert(userProfileTable).values({
  id: user.id,
  name: user.name
}).execute();

test(
  "GivenUser_WithProfileEmpty_AndNoOtherProfileWithSameName_WhenCheckUserNameIsAvailable_ThenReturnsTrue", 
  async () => {
    const {db} = await setupDockerTestDb();
    await withUser(db, user);
    
    const isAvailable = await checkUserNameIsAvailable(db)(userProfileName);

    expect(isAvailable).toBe(true);
  }
);

test(
  "GivenUser_WithAnotherUserWithSameProfileName_WhenCheckUserNameIsAvailable_ThenReturnsFalse",
  async () => {
    const {db} = await setupDockerTestDb();
    await withUserProfile(db, {id: anotherUserId, name: userProfileName});
    
    const isAvailable = await checkUserNameIsAvailable(db)(userProfileName);

    expect(isAvailable).toBe(false);
  }
);

test(
  "GivenUser_WithAnotherUserWithSameName_WhenCheckUserNameIsAvailable_ThenReturnsFalse",
  async () => {
    const {db} = await setupDockerTestDb();
    await withUser(db, {id: userId, name: userProfileName, avatar: 'some-avatar'});
    
    const isAvailable = await checkUserNameIsAvailable(db)(userProfileName);

    expect(isAvailable).toBe(false);
  }
)