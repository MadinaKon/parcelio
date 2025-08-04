import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../db/mongodb.js";

// Check if email configuration is complete
const isEmailConfigured = () => {
  return (
    process.env.EMAIL_SERVER_HOST &&
    process.env.EMAIL_SERVER_PORT &&
    process.env.EMAIL_SERVER_USER &&
    process.env.EMAIL_SERVER_PASSWORD &&
    process.env.EMAIL_FROM
  );
};

// Build providers array conditionally
const getProviders = () => {
  const providers = [];

  // Add GitHub provider if configured
  if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
    providers.push(
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      })
    );
  }

  // Add Google provider if configured
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    );
  }

  // Add Email provider if configured
  if (isEmailConfigured()) {
    providers.push(
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: Number(process.env.EMAIL_SERVER_PORT),
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      })
    );
  } else {
    console.warn(
      "⚠️  Email provider not configured. Email sign-in will be disabled."
    );
    console.log(
      "To enable email sign-in, set the following environment variables:"
    );
    console.log("- EMAIL_SERVER_HOST");
    console.log("- EMAIL_SERVER_PORT");
    console.log("- EMAIL_SERVER_USER");
    console.log("- EMAIL_SERVER_PASSWORD");
    console.log("- EMAIL_FROM");
  }

  return providers;
};

export const authOptions = {
  providers: getProviders(),
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, user }) {
      session.user.userId = user.id;
      return session;
    },
    async signIn({ account, profile }) {
      // Only apply restrictions to Google sign-ins
      if (account?.provider === "google" && profile) {
        // Check if email is verified and ends with @gmail.com
        const isEmailVerified = profile.email_verified === true;
        const isGmailDomain =
          profile.email && profile.email.endsWith("@gmail.com");
        return isEmailVerified && isGmailDomain;
      }

      // Allow all other sign-ins (GitHub, Email, etc.)
      return true;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin", // Redirect to signin page on error
  },
};

export default NextAuth(authOptions);
