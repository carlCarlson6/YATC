import { User } from 'src/server/user/profile/userProfile.drizzle.schema';

export const mockAuthValidator = (withUser: User) => () => Promise.resolve({ ...withUser });
