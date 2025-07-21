import Link from "next/link";
import { nav } from "./Nav.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Dashboard from "../dashboard/Dashboard";
import { Avatar } from "@mui/material";
import Image from "next/image";

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

          <Link href="/profile">
            Profile
             <Avatar alt="Remy Sharp" src={session.user?.image} /> 
     
          </Link>
          {/* <Link href={`/profile/${id}`}>Profile</Link> */}
        </>
      )}
    </nav>
  );
}
