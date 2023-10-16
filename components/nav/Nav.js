import Link from "next/link";
import { nav } from "./Nav.module.css";
// import { useSession } from "next-auth/react";

export default function Nav() {
  // const { data: session } = useSession();

  return (
    <nav className={nav}>
      <Link href="/">Home</Link>

      <>
        {/* <Link href="/user/">Your Posts</Link>
        <Link href="/user/edit">Edit Profile</Link>
        <Link href="/createService">New Post</Link> */}
        {/* <Link href="/user/">Your services</Link> */}
        <Link href="/update-service">Update service</Link>
        <Link href="/createService">New service</Link>
      </>
    </nav>
  );
}
