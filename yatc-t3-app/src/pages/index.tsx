import { CodeIcon, DiscordLogoIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Box, Button, Container, Flex, Heading, IconButton, Separator, Text } from "@radix-ui/themes";
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
			<DevelopedBy />
		</Flex>
	</Container>
)

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context)

	if (session) {
		return {
			redirect: {
				destination: `${session.user.name}/timeline`,
				permanent: false,
			},
		}
	}

	return { props: { session } }
}

const DevelopedBy = () => (
	<Box pt={'9'}>
		<Text>Developed by Carlos A.D.</Text>
		<Flex pt={'4'} align={'center'} justify={'center'} gap={'3'}>
			<a href="https://github.com/carlCarlson6" target="_blank">
				<IconButton variant={'outline'} style={{ cursor: 'pointer' }} >
					<GitHubLogoIcon />
				</IconButton>
			</a>
			<a href="https://github.com/carlCarlson6" target="_blank">
				<IconButton variant={'outline'} style={{ cursor: 'pointer' }}>
						<CodeIcon />
				</IconButton>
			</a>
			<a href="https://www.linkedin.com/in/carlos-acitores-deval-a3914a1b/" target="_blank">
				<IconButton variant={'outline'} style={{ cursor: 'pointer' }}>
					<LinkedInLogoIcon />
				</IconButton>
			</a>
		</Flex>
	</Box>
);