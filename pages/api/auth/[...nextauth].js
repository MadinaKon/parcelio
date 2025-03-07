import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../db/mongodb.js";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // profile: (profile) => {
      //   return {
      //     id: profile.id,
      //     // This ID is required but it will not be saved in your users collection
      //     name: profile.name,
      //     email: profile.email,
      //     image: profile.avatar_url,

      //     // You can add any other properties you want to the user object
      //     admin: false,
      //     preferedColors: ["#dddddd", "#ffffff"],
      //   };
      // },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, user }) {
      session.user.userId = user.id;

      return session;
    },
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@gmail.com");
      }
      return true;
    },
  },
};

export default NextAuth(authOptions);
