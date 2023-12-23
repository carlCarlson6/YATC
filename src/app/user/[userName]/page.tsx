import { Box } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "src/server/auth/infrastructure/nextauth";
import { UserProfileDisplay } from "src/ui/user-profile/UserProfileDisplay";
import { UserProfileControls } from "src/ui/user-profile/controls/UserProfileControls";
import { notFound } from 'next/navigation'
import { fetchUserProfile } from "src/server/user/profile/api";

export type UserProfileProps = Awaited<ReturnType<typeof fetchUser>>;

const fetchUser = async (userName: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }

  const data = await fetchUserProfile(
    {...session.user, avatar: session.user.image}, 
    userName
  );

  if (!data) {
    notFound();
  }

  return data;
}

export default async function UserPage({ params }: { params: { userName: string } }) {
  const data = await fetchUser(params.userName);
  return (<>
    <Box>
      <UserProfileControls 
        isOwnProfile={data.user.isOwnProfile} 
        followed={data.user.followed}
        userId={data.user.id}
      />
      <UserProfileDisplay 
        user={data.user} 
        emojeets={data.emojeets} 
      />
    </Box>
  </>);
}