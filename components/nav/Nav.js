import Link from "next/link";
import { nav } from "./Nav.module.css";
// import { useSession } from "next-auth/react";

export default function Nav() {
  // const { data: session } = useSession();

  return (
    <nav className={nav}>
      <Link href="/">Home</Link>

      <>
        {/* <Link href="/user/">Your services</Link> */}
        {/* <Link href="/updateService">Update service</Link> */}
        <Link href="/update-service">Update service</Link>
        <Link href="/createService">New service</Link>
      </>
    </nav>
  );
}
