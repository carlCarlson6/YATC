import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "yact/ui/api";
import '@radix-ui/themes/styles.css';
import { Box, Theme } from "@radix-ui/themes";
import "yact/ui/styles.css"

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <Theme appearance={'dark'}>
      <Box p={'5'}>
        <Component {...pageProps} />
      </Box>
    </Theme>
  </SessionProvider>
);

export default api.withTRPC(MyApp);
