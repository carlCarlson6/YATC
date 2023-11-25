import { Button } from "@radix-ui/themes";
import { PersonIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';
import type { User } from "yact/server/user/user";

export const UserProfileButton: React.FC<{ user: User; }> = ({ user }) => {
  const router = useRouter();
  return (
    <Button variant={'outline'} style={{ cursor: 'pointer' }} onClick={_ => router.push(`user/${user.name}`)}>
      <PersonIcon />
    </Button>
  );
};
