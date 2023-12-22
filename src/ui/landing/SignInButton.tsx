"use client"

import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import React from "react";

export const SignInButton = () => (
	<Box pt={'8'}>
		<Button
			variant={'soft'}
			onClick={() => signIn()}
			style={{ cursor: 'pointer' }}
		>
			<Flex
				align={'center'}
				justify={'center'}
				direction={'row'}
				gap={'3'}
			>
				<p>Enter</p> <DiscordLogoIcon />
			</Flex>
		</Button>
	</Box>
);
