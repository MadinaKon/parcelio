import Head from "next/head";
import Footer from "../footer/Footer";
import Nav from "../nav/Nav";
import Dashboard from "../dashboard/Dashboard";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
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
