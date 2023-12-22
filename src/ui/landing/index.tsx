import { CodeIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Box, Flex, Grid, Heading, IconButton, Text } from "@radix-ui/themes";
import Image, { type StaticImageData }  from "next/image";
import TypescriptImg from "src/ui/imgs/typescript.png";
import NextJsImg from "src/ui/imgs/nextjs.png";
import VercelImg from "src/ui/imgs/vercel.png";
import PlanetScaleImg from "src/ui/imgs/planetscale.png"
import T3Img from "src/ui/imgs/t3-dark.svg"
import DrizzleOrmImg from "src/ui/imgs/drizzleorm.png"
import TrpcImage from "src/ui/imgs/tprc.png"
import NextAuthImage from "src/ui/imgs/nextauth.png"
import ZodImg from "src/ui/imgs/zod.svg"
import React from "react";

export const LandingHeading = () => (<>
	<Heading size={'9'}>
		Y.A.T.C.
	</Heading>
	<Heading>
		Yet another Twitter clone
	</Heading>
	<Heading size={'3'}>
		(but with emojis)
	</Heading>
</>);1

export const DevelopedBy = () => (
	<Box pt={'8'}>
		<Text>Developed by Carlos A.D.</Text>
		<Flex pt={'5'} align={'center'} justify={'center'} gap={'3'}>
			<a href="https://github.com/carlCarlson6" target="_blank">
				<IconButton variant={'outline'} style={{ cursor: 'pointer' }} >
					<GitHubLogoIcon />
				</IconButton>
			</a>
			<a href="https://github.com/carlCarlson6/YATC" target="_blank">
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

export const TechStack = () => (
	<Box pt={'3'}>
		<Text>About the Stack</Text>
		<Box style={{backgroundColor: "#FFFFFF22", borderRadius: '5px'}} m={'3'} >
			<Grid columns={'3'} gap={'3'}>
				<StackImage img={TypescriptImg} alt="ts" link="https://www.typescriptlang.org/" />
				<StackImage img={NextJsImg} alt="nextjs" link="https://nextjs.org/" />
				<StackImage img={VercelImg} alt="vercel" link="https://vercel.com/"/>
				<StackImage img={PlanetScaleImg} alt="planetscale" link="https://planetscale.com/" />
				<StackImage img={T3Img as StaticImageData} alt="t3" link="https://create.t3.gg/" />
				<StackImage img={DrizzleOrmImg} alt="drizzleorm" link="https://orm.drizzle.team/" />
				<StackImage img={NextAuthImage} alt="nextauth" link="https://next-auth.js.org/" />
				<StackImage img={TrpcImage} alt="trpc" link="https://trpc.io/" />
				<StackImage img={ZodImg as StaticImageData} alt="zod" link="https://zod.dev/" />
			</Grid>
		</Box>
	</Box>
);


export const StackImage: React.FC<{img: StaticImageData, alt: string, link: string}> = ({img, alt, link}) => (
	<a href={link} target="_blank">
		<Flex p={'1'} className="StackImage" justify={'center'} align={'center'} style={{borderRadius: '5px', cursor: "pointer"}}>
			<Image src={img} alt={alt} width={'20'} />
		</Flex>
	</a>
);