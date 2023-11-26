import { Box, Flex, Button } from "@radix-ui/themes";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';

export const UserProfileControls = () => (
<>
  <Box style={{ width: "10%", float: 'left' }} position={'fixed'}>
    <Flex direction={'column'} gap={'2'}>
      <BackToTimelineButton />
    </Flex>
  </Box>
</>);

export const BackToTimelineButton = () => {
  const router = useRouter();
  return (<>
    <Button
      variant={'outline'}
      style={{ cursor: 'pointer' }}
      onClick={_ => router.push("/timeline")}
    >
      <DoubleArrowLeftIcon />
    </Button>
  </>);
}