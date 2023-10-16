import { btn, logout, login } from "./AuthButton.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  console.log("SESSION ", session);

  if (session) {
    return (
      <>
        <button className={`${btn} ${logout}`} onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button className={`${btn} ${login}`} onClick={() => signIn()}>
        Sign in with GitHub
      </button>
      <button className={`${btn} ${login}`} onClick={() => signIn("google")}>
        Sign in with Google
      </button>
    </>
  );
}
