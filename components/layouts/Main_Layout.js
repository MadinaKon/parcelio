import Head from "next/head";
import Footer from "../footer/Footer";
import Nav from "../nav/Nav";
import Dashboard from "../dashboard/Dashboard";

export default function Main_Layout({ children }) {
  return (
    <>
      <Dashboard>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
      </Dashboard>
      <br />
      <main>{children}</main>
      <Footer />
    </>
  );
}
