import NextAuth from "next-auth";
// Adding prisma adapter 
import {PrismaAdapter} from "@auth/prisma-adapter"

import { getUserById } from "./data/user";
// we can also use the getUserByEmail but it will be an expensive query and since the id is primary key , searching will be fast
import { db } from "./lib/db";
import authConfig from "./auth.config";


// we have to add GET and POST inside the api for the next auth
// auth to get the current session of the user if any 
// signIN etc can be used only in server action
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages:{
    signIn:"/auth/login",
    error:"/auth/error"
  },
  events:{
   async linkAccount({user}){
      await db.user.update({
        where: {id:user.id},
        data: {emailVerified:new Date()}
      })
    }
  },
  // how we can transfer id from token to the session
    callbacks:{
      async signIn({user,account}){
        // Allow OAuth without email verifications
        console.log({
          user,
          account
        })

        if(account?.provider !== "credentials") return true;

        const existingUser = await getUserById(user.id);

        // Prevent sign in without email verification
        if(!existingUser?.emailVerified) return false;

        // TODO add 2FA check

        return true;
        // allowing to sign in
      },
      // async signIn({user}){
      //   const existingUser = await getUserById(user.id);

      //   if(!existingUser || !existingUser.emailVerified){
      //     // will wont allow user to login if either their email is not verified or they do not exist in our databse
      //     return false;
      //   }
      //   return true;
      //   // allow user to sign in
      // },
      async session({token,session}){
        console.log({
          sessionToken: token,
        //   session,
        })
        // session.user.customField = token.customField;
        if (token.sub && session.user){
          session.user.id = token.sub;
        }
        if(token.role && session.user){
            session.user.role = token.role as 'ADMIN' | 'USER';
        }
        // Now we can access the id whetehr it is server side componetn or client side 
        return session;
      },
      async jwt({token}){
        // token is much more reliable to use for the logged in user
        // console.log({token});
        // token.customField="test";
        // it will be available in both sessionToken adn token
        if(!token.sub)  return token;

        const existingUser = await getUserById(token.sub);
        if(!existingUser) return token;
        token.role = existingUser.role;
        return token;
      }
    },
    // passing the database to the prisma adapter
    // here it contains non edge supported Prisma Adapter hence we need to make some changes in middleware.ts
    adapter:PrismaAdapter(db),
    session:{strategy:"jwt"},
    ...authConfig,
});
