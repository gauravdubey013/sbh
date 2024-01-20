import NextAuth, { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";
import Professional from "@/models/Professional";

const signInWithGoogle = "google";
const signInWithGithub = "gitHub";
const role = "user";
const password = "setPassword@123";
const hashPassword = await bcrypt.hash(password, 5);

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") return true;

      if (account.provider === "google") {
        try {
          await connect();
          const userExists = await User.findOne({ email: user.email });

          if (!userExists) {
            const newUser = new User({
              name: user.name,
              signInWith: signInWithGoogle,
              email: user.email,
              password: hashPassword,
              role,
            });
            const user = await newUser.save();
            return user;
          }
          return userExists;
        } catch (error) {
          console.log("Error storing onto the db : ", error);
          return false;
        }
      }

      if (account.provider === "github") {
        await connect();
        try {
          const userExists = await User.findOne({ email: user.email });
          if (!userExists) {
            const newUser = new User({
              name: user.name,
              signInWith: signInWithGithub,
              email: user.email,
              password: hashPassword,
              role,
            });
            const user = await newUser.save();
            return user;
          }
          return userExists;
        } catch (error) {
          console.log("Error storing onto the db : ", error);
          return false;
        }
      }
    },
    async jwt({ token, user }) {
      if (typeof user !== "undefined") {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      await connect();
      if (typeof token?.user !== "undefined") {
        const userExists = await User.findOne({ email: token?.user?.email });
        const profExists = await Professional.findOne({
          email: token?.user?.email,
        });
        if (userExists?.role === "professional") {
          session.user = {
            user: token.user,
            prof: profExists,
          };
        } else if (
          userExists.signInWith !== "google" ||
          userExists.signInWith !== "gitHub"
        ) {
          session.user = {
            user: userExists,
            authUser: token.user,
          };
        } else {
          session.user = { user: token.user };
        }
      }
      return session.user;
    },
    // async session({ session, token }) {
    //   await connect();
    //   if (typeof token?.user !== "undefined") {
    //     const userExists = await User.findOne({ email: token?.user?.email });
    //     const profExists = await Professional.findOne({
    //       email: token?.user?.email,
    //     });
    //     if (userExists?.role === "professional") {
    //       session.user = {
    //         user: token.user,
    //         prof: profExists,
    //       };
    //     } else if (
    //       userExists.lastname !== "google" ||
    //       userExists.lastname !== "gitHub"
    //     ) {
    //       session.user = {
    //         user: userExists,
    //         authUser: token.user,
    //       };
    //     } else {
    //       session.user = { user: token.user };
    //     }
    //   }
    //   return session;
    // },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
