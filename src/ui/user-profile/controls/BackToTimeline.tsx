import { Button } from "@radix-ui/themes";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import ButtonLoaderIcon from "src/ui/ButtonLoaderIcon";

export const BackToTimeline = () => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  return (<>
    <Button
      variant={'outline'}
      style={{ cursor: 'pointer' }}
      onClick={_ => {
        setIsNavigating(true);
        router.push("/timeline");
      }}
    >
      {!isNavigating 
        ? <DoubleArrowLeftIcon /> 
        : <ButtonLoaderIcon />
      }
    </Button>
  </>);
};
