import { Button, Flex } from "@radix-ui/themes";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export const RealoadButton = () => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  return (
    <Button 
      variant={'outline'} 
      style={{ cursor: 'pointer' }} 
      onClick={_ => {
        setIsNavigating(true);
        router.refresh();
      }}
    >
      { !isNavigating ?
        <ReloadIcon /> :
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
