import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

// it is possible that users can surpass the server actions
// and don't use our login page at all and use api/auth directly
// Hence we have to do login check here also

export default {
    providers: [
        Credentials({
            async authorize(credentials){
                const validatedFields = LoginSchema.safeParse(credentials);
                if(validatedFields.success){
                    const {email,password} = validatedFields.data;

                    const user = await getUserByEmail(email);
                    // we wont allow the users who have login with gmail to use the credentials provider
                    if(!user || !user.password) return null;

                    // confirming if the password is correct withour actually knowing the correct password
                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );
                
                    if(passwordsMatch) return user;
                }
                return null;
            }
        })
    ] 
} satisfies NextAuthConfig;
