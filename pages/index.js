import Head from "next/head";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../components/StyledLink.js";
import DataGridComponent from "../components/TableDataGrid";
import Profile from "../components/profile";
import { useSession } from "next-auth/react";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-left: 0;
`;

const ListItem = styled.li`
  position: relative;
  width: 100%;
`;
const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

export default function Home() {
  const { data: session } = useSession();
  let apiUrl;
  if (session) {
    apiUrl = `/api/services?userId=${session?.user.userId}`;
  } else {
    apiUrl = `/api/services`;
  }

  const { data } = useSWR(apiUrl, {
    fallbackData: [],
  });

  if (!data) return;

  return (
    <>
      <Head>
        <title>Parcelio App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Profile />
      <main>
        <h1>Parcelio - send your parcel through Kyrgyz community 🇰🇬</h1>
        <DataGridComponent data={data} />
      </main>
    </>
  );
}
