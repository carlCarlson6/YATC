import { Card, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { fetchEmojeet } from "src/server/api";
import type { Emojeet } from "src/server/timeline/EmojiTweet";
import { EmojeetInfo } from "src/ui/emojeet/EmojeetInfo";
import { UserInfo } from "src/ui/emojeet/UserInfo";

export default async function Emojeet({params}: {params: {emojeetId: string}}) {
  const emojeet = await fetchEmojeet(params.emojeetId);
  if (!emojeet) {
    notFound();
  }

  return (<>
    <Flex justify={'center'} pt={'8'}>
      <Card
        key={emojeet.id}
        size={'1'}
        variant={'surface'}
        style={{
          width: '60rem'
        }}
      >
        <Flex
          align={'start'}
          direction={'column'}
          justify={'center'}
        >
          <UserInfo user={emojeet.user} />
          <EmojeetInfo emoji={emojeet.emoji} reactions={emojeet.reactions} />
        </Flex>
      </Card>
    </Flex>
  </>);
}