import { DrizzleDb } from 'src/server/infrastructure/drizzle';
import { usersTable } from 'src/server/infrastructure/drizzle/base.drizzle.schema';
import { User } from 'src/server/user/profile/userProfile.drizzle.schema';

export const withUser = (db: DrizzleDb, user: User) => db.insert(usersTable).values({
  id: user.id,
  name: user.name,
  email: `${user.name}@mail.com`,
  image: user.avatar
}).execute();
