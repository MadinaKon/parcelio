import Head from "next/head";
import Form from "../components/Form";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../components/StyledLink.js";
import CreateServicePage from "./createService";
import UpdateServicePage from "./services/[id]/updateService";
import TableOverview from "../components/TableOverview";
import { mainListItems } from "../components/listItems";
import TableDataGrid from "../components/TableDataGrid";

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
  const { data } = useSWR("/api/services", { fallbackData: [] });

  return (
    <>
      <Head>
        <title>Parcelio App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <CreateServicePage /> */}
        {/* <UpdateServicePage /> */}

        {/* <List component="nav">{mainListItems}</List> */}
        {/* <TableOverview data={data} /> */}
        <TableDataGrid />
      </main>
    </>
  );
}
