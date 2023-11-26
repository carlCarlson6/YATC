import { Avatar, Box, Flex, Text, Separator } from "@radix-ui/themes";
import { TweetsDisplay } from "yact/ui/TweetsDisplay";
import type { UserProfileProps } from "../../pages/user/[userName]";

export const UserProfileDisplay = ({ user, tweets }: UserProfileProps) => (<>
  <Box style={{ width: '85%', float: 'right' }}>
    <Flex  direction={'column'} gap={'5'}>
      <Box pb={'2'} grow={'1'}>
        <Flex  gap={'2'}>
          <Avatar
            size={'7'}
            src={user.avatar}
            fallback={user.name} />
          <Text>{user.name}</Text>
        </Flex>
      </Box>
      <Separator size={'4'} />
      <Box>
        <TweetsDisplay tweets={tweets} />
      </Box>
    </Flex>
  </Box>
</>);
