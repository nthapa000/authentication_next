"use server"

import * as z from "zod";
import { LoginSchema } from "@/schemas";

// since we are using promises
export const login = async (values:z.infer<typeof LoginSchema>)=>{
    const validateFields = LoginSchema.safeParse(values);
    if(!validateFields.success){
        return{error:"Invalid fields"}
    }
    return{success:"Email sent!"}
}