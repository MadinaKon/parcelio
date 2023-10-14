import Head from "next/head";
import Form from "../components/Form";
import useSWR from "swr";
import CreateServicePage from "./createService";
import UpdateServicePage from "./services/[id]/updateService";

export default function Home() {
  const { data } = useSWR("/api/services", { fallbackData: [] });

  return (
    <>
      <Head>
        <title>Parcelio App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CreateServicePage />
        {/* <UpdateServicePage /> */}
      </main>
    </>
  );
}
