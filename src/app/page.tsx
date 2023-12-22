import { Container, Flex } from "@radix-ui/themes";
import Head from "next/head";
import { DevelopedBy, LandingHeading, TechStack } from "src/ui/landing";
import { SignInButton } from "src/ui/landing/SignInButton";
import "src/ui/styles.css"

export default function Landing() {
  console.log("here on app")
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