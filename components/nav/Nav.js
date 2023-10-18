import Link from "next/link";
import { nav } from "./Nav.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Nav() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  console.log("ID from ROUTER QUERY ", id);

  return (
    <nav className={nav}>
      <Link href="/">Home</Link>
      {session && (
        <>
          {/* <Link href="/user/">Your services</Link> */}
          {/* TODO here we need authentication, after that http://localhost:3001/services/undefined/updateService will be replaced userId services */}
          {/* <Link href={`/services/${id}/updateService`}>Update service</Link> */}

          <Link href="/createService">New service</Link>
        </>
      )}
    </nav>
  );
}
