import { Container, Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { redirect } from "next/navigation";
import { authOptions } from "src/server/infrastructure/nextauth";
import { DevelopedBy, LandingHeading, TechStack } from "src/ui/landing";
import { SignInButton } from "src/ui/landing/SignInButton";
import "src/ui/styles.css"

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