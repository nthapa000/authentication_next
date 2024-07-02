import NextAuth from "next-auth";
// Adding prisma adapter 
import {PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "./lib/db";
import authConfig from "./auth.config";

// we have to add GET and POST inside the api for the next auth
// auth to get the current session of the user if any 
export const {
  auth,
  handlers: { GET, POST },
} = NextAuth({
    // passing the database to the prisma adapter
    // here it contains non edge supported Prisma Adapter hence we need to make some changes in middleware.ts
    adapter:PrismaAdapter(db),
    session:{strategy:"jwt"},
    ...authConfig,
});
