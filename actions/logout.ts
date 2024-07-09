"use server";

import { signOut } from "@/auth";

export const logout = async () =>{

    // If we want to do some server stuff before logout , Removing user , clearing user etc
    await signOut();
}