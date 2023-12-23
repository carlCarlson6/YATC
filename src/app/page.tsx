import { Container, Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { redirect } from "next/navigation";
import { authOptions } from "src/server/infrastructure/nextauth";
import { DevelopedBy, LandingHeading, TechStack } from "src/ui/landing";
import { SignInButton } from "src/ui/landing/SignInButton";

/* TODO
  Warning: You're using `next/head` inside the `app` directory, please migrate to the Metadata API.
  See https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-3-migrating-nexthead for more details.
*/

export default async function Landing() {
	if (await getServerSession(authOptions)) {
		redirect('timeline');
	}

  return (<>
		<Head><title>YATC</title></Head>
		<Container
			pt={'5'}
		>
			<Flex
				align={'center'}
				justify={'center'}
				direction={'column'}
				gap={'3'}
			>
				<LandingHeading />
				<SignInButton />
				<DevelopedBy />
				<TechStack />
			</Flex>
		</Container>
	</>);
}