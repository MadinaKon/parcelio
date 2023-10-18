import Head from "next/head";
import Footer from "../footer/Footer";
import Nav from "../nav/Nav";

export default function Main_Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
