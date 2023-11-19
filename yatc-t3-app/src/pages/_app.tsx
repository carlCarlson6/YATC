import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "yact/utils/api";
import '@radix-ui/themes/styles.css';
import { Theme } from "@radix-ui/themes";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <Theme appearance="dark">
      <Component {...pageProps} />
    </Theme>
  </SessionProvider>
);

export default api.withTRPC(MyApp);
