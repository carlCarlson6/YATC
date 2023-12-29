"use client";
import { Avatar, Box, Flex, Link, Text } from "@radix-ui/themes";
import React from "react";
import type { User } from "src/server/user/profile/userProfile.drizzle.schema";

export const UserInfo = ({ user }: { user: User; }) => (<>
  <Flex align={'center'} gap={'3'} pb={'3'}>
    <Box>
      <a
        href={`/user/${user.name}`}
        style={{ cursor: 'pointer' }}
      >
        <Avatar
          src={user.avatar}
          alt={user.name}
          size="3"
          radius="full"
          fallback={user.name}
          color="indigo" />
      </a>
    </Box>
    <Box>
      <Link
        href={`/user/${user.name}`}
        color={'violet'}
        weight={'light'}
        style={{ cursor: 'pointer' }}
      >
        <Text as="div" size="2" weight="bold">
          {user.name}
        </Text>
      </Link>
    </Box>
  </Flex>
</>);
