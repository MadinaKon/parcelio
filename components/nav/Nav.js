import Link from "next/link";
import { nav } from "./Nav.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Dashboard from "../dashboard/Dashboard";

export default function Nav() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  return (
    <nav className={nav}>
      <Link href="/">Home</Link>
      {session ? (
        <Link href="/signin">Sign out</Link>
      ) : (
        <Link href="/signin">Sign in</Link>
      )}

      {session && (
        <>
          {/* <Link href="/user/">Your services</Link> */}
          {/* TODO here we need authentication, after that http://localhost:3001/services/undefined/updateService will be replaced userId services */}
          {/* <Link href={`/services/${id}/updateService`}>Update service</Link> */}

          <Link href="/profile">Profile</Link>
          {/* <Link href={`/profile/${id}`}>Profile</Link> */}
        </>
      )}
    </nav>
  );
}
