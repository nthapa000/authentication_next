import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (
    token:string
) => {
    try{
        const verificationToken = await db.verificationToken.findUnique({
            // using email to search
            where: {token}
        });
        return verificationToken;
    }catch{
        return null;
    }
}

export const getVerificationTokenByEmail = async (
    email:string
) => {
    try{
        const verificationToken = await db.verificationToken.findFirst({
            // using email to search
            where: {email}
        });
        return verificationToken;
    }catch{
        return null;
    }
}