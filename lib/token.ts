import { getVerificationTokenByEmail } from '@/data/verificationToken';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from '@/data/two-factor';

export const generateTwoFactorToken = async (email:string)=>{
    const token = crypto.randomInt(100000,1000000).toString();
    // We can change this time to lesser
    const expires = new Date(new Date().getTime() + 3600*1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken){
        await db.twoFactorToken.delete({
            where:{
                id:existingToken.id,
            }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data:{
            email,
            token,
            expires,
        }
    })

    return twoFactorToken;
}

export const generatePasswordResetToken = async (email:string)=>{
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);
    if(existingToken){
        await db.passwordResetToken.delete({
            where:{id:existingToken.id}
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data:{
            email,
            token,
            expires
        }
    });

    return passwordResetToken;
}

// now find a place where we going to run this function 
export const getVerificationToken = async (email:string) => {
    const token = uuidv4();
    // 1hr from now
    const expires = new Date(new Date().getTime() + 3600*1000);

    // check if existing token sent for this email
    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken){
        await db.verificationToken.delete({
            where:{
                id:existingToken.id,
            }
        })
    }
    const verificationToken = await db.verificationToken.create({
        data:{
            email,
            token,
            expires,
        }
    });
    return verificationToken;
}