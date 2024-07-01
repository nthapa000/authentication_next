"use server"

import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

// since we are using promises
export const register = async (values:z.infer<typeof RegisterSchema>)=>{
    const validateFields = RegisterSchema.safeParse(values);
    if(!validateFields.success){
        return{error:"Invalid fields"}
    }
    // since we know that the fields are validated
    const {email,password,name}= validateFields.data;
    // hashing the password
    const hashedPassword = await bcrypt.hash(password,10)
    // conform whether email is available on not this will be done by checking on the database
    // finding if there exist a user with the given email address
    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return {error:"Email already in use!"};
    }
    // since user doesn't exist with the given email address now we can create a new user
    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
        }
    });

    // TODO: send verification email

    return{success:"User Created!"}
}