import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "./db";
import { User } from "@/Models/userModel";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      await connectDB();
      const existingUser = await User.findOne({ email: session.user.email });

      if (!existingUser) {
        const newUser = new User({
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        });
        await newUser.save();
      }

      return session;
    },
  },
};

export const {auth,signIn,signOut,handlers:{GET,POST}} = NextAuth(authConfig);

