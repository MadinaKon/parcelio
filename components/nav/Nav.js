import Link from "next/link";
import { nav } from "./Nav.module.css";
import { useSession } from "next-auth/react";
import { Avatar } from "@mui/material";

export default function Nav() {
  const { data: session } = useSession();

  return (
    <nav className={nav}>
      <Link href="/">Home</Link>
      {session ? (
        <Link href="/signin">Sign out</Link>
      ) : (
        <Link href="/signin">Sign in</Link>
      )}

      {session && (
        <Link href="/profile">
          Profile
          <Avatar alt="Remy Sharp" src={session.user?.image} />
        </Link>
      )}
    </nav>
  );
}
