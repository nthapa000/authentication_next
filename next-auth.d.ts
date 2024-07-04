import NextAuth,{type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    // We can add a custom field here and then we will get the the autocomplete
    role:"ADMIN" |"USER"
};

// instead of extending auth core we will extend the next auth
declare module "next-auth"{
    interface Session{
      user: ExtendedUser;
    }
  }

