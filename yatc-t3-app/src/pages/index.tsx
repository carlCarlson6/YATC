import { Container, Flex } from "@radix-ui/themes";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { LandingHeading, EnterButton, DevelopedBy, TechStack } from "src/ui/landing";

export default function Landing() {
	return (<>
		<Head>
    	<title>YATC</title>
		</Head>
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
				<EnterButton />
				<DevelopedBy />
				<TechStack />
			</Flex>
		</Container>
	</>);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context)

	if (session) {
		return {
			redirect: {
				destination: `timeline`,
				permanent: false,
			},
		}
	}

	return { props: { session } }
}