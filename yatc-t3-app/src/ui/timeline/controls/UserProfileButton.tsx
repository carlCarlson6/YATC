import { Button, Flex } from "@radix-ui/themes";
import { PersonIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';
import type { User } from "src/server/user/user";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export const UserProfileButton: React.FC<{ user: User; }> = ({ user }) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  return (
    <Button 
      variant={'outline'} 
      style={{ cursor: 'pointer' }} 
      onClick={_ => {
        setIsNavigating(true);
        router.push(`user/${user.name}`);
      }}
    >
      { !isNavigating ?
        <PersonIcon /> :
        <Flex align={'center'} justify={'center'}>
          <ClipLoader
            size={10}
            color="#9EB1FF"
            speedMultiplier={0.7}
          />
        </Flex>
      }
    </Button>
  );
};