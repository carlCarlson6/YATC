import { Box, Flex, Button, Separator, Text } from "@radix-ui/themes";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

export const UserProfileControls: React.FC<{
  isOwnProfile: boolean, 
  followed: boolean
}> = ({isOwnProfile, followed}) => (
<>
  <Box style={{ width: "10%", float: 'left' }} position={'fixed'}>
    <Flex direction={'column'} gap={'2'}>
      { isOwnProfile ?
        <></> :
        <>
          <FollowButton followed={followed} />
          <Separator size={'4'}/>  
        </>
      }
      
      <BackToTimelineButton />
    </Flex>
  </Box>
</>);

export const FollowButton: React.FC<{followed: boolean}> = ({followed}) => {
  return (
    <Button
      variant={'outline'}
      style={{ cursor: 'pointer' }}
    >{followed ?
      <Text>Following</Text> :
      <Text>Follow</Text>
    }</Button>
  );
}

export const BackToTimelineButton = () => {
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
      { !isNavigating ?
        <DoubleArrowLeftIcon /> :
        <Flex align={'center'} justify={'center'}>
          <ClipLoader
            size={10}
            color="#9EB1FF"
            speedMultiplier={0.7}
          />
        </Flex>
      }
    </Button>
  </>);
}