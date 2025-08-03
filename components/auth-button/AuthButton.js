import { btn, logout, login } from "./AuthButton.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        className={`${btn} ${logout}`}
        onClick={() => signOut()}
        data-cy="sign-out"
      >
        Sign out
      </button>
    );
  }
  return (
    <>
      <button
        className={`${btn} ${login}`}
        onClick={() => signIn("github", { callbackUrl: `/` })}
        data-cy="sign-in-github"
      >
        Sign in with GitHub
      </button>
      <button
        className={`${btn} ${login}`}
        onClick={() => signIn("google")}
        data-cy="sign-in-google"
      >
        Sign in with Google
      </button>
      <button onClick={() => signIn("email")} data-cy="sign-in-button">
        Sign in with Email
      </button>
    </>
  );
}
