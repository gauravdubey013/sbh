import NextAuth, { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";
import Professional from "@/models/Professional";

export const authOptions = {
  // Configuring google & gitHub authentication providers
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
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
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
              email: user.email,
              signInWith: "google",
            });
            const savedUser = await newUser.save();
            return savedUser;
          }
          return userExists;
        } catch (error) {
          console.log("Error storing onto the db : ", error);
          return false;
        }
      }

      if (account.provider === "github") {
        try {
          await connect();
          const userExists = await User.findOne({ email: user.email });
          if (!userExists) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              signInWith: "gitHub",
            });
            const savedUser = await newUser.save();
            return savedUser;
          }
          return userExists;
          // mongoose.connection.close();
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
          if (
            userExists.signInWith !== "google" ||
            userExists.signInWith !== "gitHub"
          ) {
            session.user = {
              authuser: token.user,
              user: userExists,
              prof: profExists,
            };
          } else {
            session.user = {
              user: token.user,
              prof: profExists,
            };
          }
          return session.user;
        } else if (
          userExists.signInWith !== "google" ||
          userExists.signInWith !== "gitHub"
        ) {
          session.user = {
            authUser: token.user,
            user: userExists,
          };
          return session.user;
        } else {
          session.user = { user: token.user };
          // return session.user;
        }
      }
      return session.user;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
