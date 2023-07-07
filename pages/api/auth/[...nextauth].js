import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const { email, password } = credentials;

                try {
                    await connectDB();
                } catch (error) {
                    throw new Error("Error in connecting to DB!");
                }

                if (!email || !password) {
                    throw new Error("Invalid Data!");
                }

                const user = await User.findOne({ email: email });

                if (!user) throw new Error("User doesn't exist!");

                const isValid = await verifyPassword(password, user.password);

                if (!isValid) throw new Error("Username or password is incorrect!");

                return { email , name : user.role  , image : user.profileimage || "" };
            },
        }),

    ],
};

export default NextAuth(authOptions);

