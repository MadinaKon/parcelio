// import "@/styles/globals.css";
import { SWRConfig } from "swr";
import Main_Layout from "../components/layouts/Main_Layout";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <SessionProvider session={session}>
        <Main_Layout>
          <Component {...pageProps} />
        </Main_Layout>
      </SessionProvider>
    </SWRConfig>
  );
}
