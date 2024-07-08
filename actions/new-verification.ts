"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";

export const newVerification = async (token:string)=>{
    const existingToken = await getVerificationTokenByToken(token);
    if(!existingToken){
        return {error:"Token does not exist!!"};
    }
    const hasExpired = new Date(existingToken.expires) < new Date();
    
    if(hasExpired){
        return {error:"Token has expired"};
    }

    // Find user whom we got to validate
    const existingUser  = await getUserByEmail(existingToken.email);
    if(!existingUser){
        return {error:"Email does not exist!"};
    }

    await db.user.update({
        where:{id:existingUser.id},
        data:{
            emailVerified: new Date(),
            // Updating email value in future
            email: existingToken.email
        }
    })
    await db.verificationToken.delete({
        where:{id:existingToken.id}
    })

    return {success:"Email verified"}
}