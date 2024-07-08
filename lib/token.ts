import { getVerificationTokenByEmail } from '@/data/verificationToken';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';

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