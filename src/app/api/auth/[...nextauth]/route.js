import NextAuth, { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";

var lastnameGoogle = "google";
var lastnameGithub = "gitHub";
var password = "setPassword";
var profCheckValue = "oAuth";

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
        const { name, email } = user;
        try {
          await connect();
          const userExists = await User.findOne({ email: user.email });

          if (!userExists) {
            const newUser = new User({
              firstname: name,
              lastname: lastnameGoogle,
              email,
              password,
              profCheckValue,
            });
            await newUser.save();
            return true;
          }
          return true;
        } catch (error) {
          console.log("Error storing onto the db : ", error);
          return false;
        }
      }

      if (account?.provider === "github") {
        await connect();
        try {
          const userExists = await User.findOne({ email: user.email });
          if (!userExists) {
            const newUser = new User({
              firstname: user.name,
              lastname: lastnameGithub,
              email: user.email,
              password,
              profCheckValue,
            });
            await newUser.save();
            return true;
          }
          return true;
        } catch (error) {
          console.log("Error storing onto the db : ", error);
          return false;
        }
      }
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
