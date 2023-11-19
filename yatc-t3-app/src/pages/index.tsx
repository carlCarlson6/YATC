import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { Box, Button, Container, Flex, Heading, IconButton } from "@radix-ui/themes";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";

export default () => (
	<Container
		pt={'5'}
	>
		<Flex
			align={'center'}
			justify={'center'}
			direction={'column'}
			gap={'3'}
		>
			<Heading size={'9'} trim={'both'}>
				Y.A.T.C.
			</Heading>
			<Heading>
				Yet another Twitter clone
			</Heading>

			<Box pt={'4'}>
				<Button
					variant={'outline'}
					onClick={() => signIn()}
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
		</Flex>
	</Container>
)

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context)

	if (session) {
		return {
			redirect: {
				destination: `${session.user.name}/time-line`,
				permanent: false,
			},
		}
	}

	return { props: { session } }
}