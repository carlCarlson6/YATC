"use client"

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export const Reload = () => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  return (
    <Button 
      variant={'outline'} 
      style={{ cursor: 'pointer' }} 
      onClick={_ => {
        setIsNavigating(true);
        router.push('/timeline');
        setIsNavigating(false);
      }}
    >
      { !isNavigating
        ? <ReloadIcon />
        : <ClipLoader
            size={10}
            color="#9EB1FF"
            speedMultiplier={0.7}
          />
      }
    </Button>
  );
};