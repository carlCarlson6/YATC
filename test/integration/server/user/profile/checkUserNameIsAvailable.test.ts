import { checkUserNameIsAvailable } from 'src/server/user/profile/checkUserNameIsAvailableAction';
import { setupDockerTestDb } from 'test/helpers/setupTestingDb';
import { withUser } from 'test/helpers/withUser';
import { expect, test } from 'vitest';

const userId = "024a0448-10d8-4a9b-9b0d-0c55caccd4c4";
const discordHandle = 'adCarl';
const userProfileName = 'carlo';

const user = {
  id: userId, 
  name: discordHandle, 
  avatar: "some-image"
}

test(
  "GivenUser_WithProfileEmpty_AndNoOtherProfileWithSameName_WhenCheckUserNameIsAvailable_ThenReturnsTrue", 
  async () => {
    const {db} = await setupDockerTestDb();
    await withUser(db, user)
    
    const isAvailable = await checkUserNameIsAvailable(db)(userProfileName);

    expect(isAvailable).toBe(true);
  }
);