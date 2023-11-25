import { Box, Button, Dialog, Flex, TextArea, Text, IconButton, HoverCard } from "@radix-ui/themes";
import { PlusCircledIcon, TrashIcon, UploadIcon, PersonIcon, ReloadIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { SyncLoader } from "react-spinners";
import { useAddTweet } from "./useAddTweet";
import { useRouter } from 'next/navigation'
import type { User } from "yact/server/user/user";

export const TimeLineControls: React.FC<{user: User}> = ({user}) => {
  const router = useRouter();
  return (
    <Box style={{ width: "10%", float: 'left' }} position={'fixed'}>
      <Flex direction={'column'} gap={'2'}>
        <AddTweetButton />
        <RealoadButton />
        <UserProfileButton user={user}/>
        <SearchUsersButton />
      </Flex>
    </Box>
  );
};

const AddTweetButton = () => {
  const { newTweet, form } = useAddTweet();
  return (
    <Dialog.Root open={form.isOpen} onOpenChange={form.setIsOpen}>
      <HoverCard.Root>
        <HoverCard.Trigger>
        <Dialog.Trigger>
          <Button
            variant={'outline'}
            style={{ cursor: 'pointer' }}
          >
            <Flex
              align={'center'}
              justify={'center'}
              direction={'row'}
              gap={'3'}
            >
              <PlusCircledIcon />
            </Flex>
          </Button>
          </Dialog.Trigger>
        </HoverCard.Trigger>
        <HoverCard.Content size={'1'}>
          <Text color={'indigo'}>publish a new tweet</Text>
        </HoverCard.Content>
      </HoverCard.Root>
      <Dialog.Content>
        <Flex direction={'column'} gap={'3'}>
          <TextArea 
            size={'3'}
            placeholder="What are you thinking about ... ?"
            value={newTweet.text}
            onChange={e => form.setText(e.target.value)}
          />
          <Flex align={'center'} justify={'between'}>
            <Flex gap={'3'} align={'center'}>
              <progress value={newTweet.progress} />
              <Text
                color={newTweet.color}
              >
                {newTweet.length}/280
              </Text>
            </Flex>
            <Flex gap={'3'}>
              {form.isSending ?
                <Box pt={'1'}>
                  <SyncLoader
                    size={7}
                    color="#9EB1FF"
                    speedMultiplier={0.5}
                  />
                </Box>
                :
                <><IconButton 
                  color="plum" 
                  variant="outline" 
                  style={{ cursor: 'pointer' }} 
                  disabled={form.canSend}
                  onClick={form.send}
                >
                  <UploadIcon />
                </IconButton> 
                <Dialog.Close onClick={form.onClose}>
                  <IconButton color="red" variant='outline' style={{ cursor: 'pointer' }}>
                    <TrashIcon />
                  </IconButton>
                </Dialog.Close></>
              }
            </Flex>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

const RealoadButton = () => {
  const router = useRouter();
  return (
    <Button variant={'outline'} style={{ cursor: 'pointer' }} onClick={_ => router.refresh()}>
      <ReloadIcon />
    </Button>
  );
};

const UserProfileButton: React.FC<{user: User}> = ({user}) => {
  const router = useRouter();
  return (
    <Button variant={'outline'} style={{ cursor: 'pointer' }} onClick={_ => router.push(`user/${user.name}`)}>
      <PersonIcon />
    </Button>
  );
}

const SearchUsersButton = () => (
  <Button variant={'outline'} style={{ cursor: 'pointer' }} >
    <MagnifyingGlassIcon />
  </Button>
);