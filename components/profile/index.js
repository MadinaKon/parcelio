import { profile } from "./Profile.module.css";
import { useSession } from "next-auth/react";

import SignIn from "./sign-in";
import ProfileInfo from "./info";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <section className={profile}>
      {session ? <ProfileInfo session={session} /> : <SignIn />}
    </section>
  );
}
