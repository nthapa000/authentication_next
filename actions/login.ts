"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { getVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";
import { error } from "console";

// since we are using promises
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validateFields.data;
  const existingUser = await getUserByEmail(email);

  // This means they should login using OAuth
  if(!existingUser || !existingUser.email || !existingUser.password){
    return {error:"Email does not Exist!"}
  }

  // Generate new token
  if(!existingUser.emailVerified){
    const verificationToken = await getVerificationToken(existingUser.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    )

    return {success:"Confirmation email sent!"};
    // Users can still use api to sign in hence we also need to protect it therw
  }

  try {
    // give the type of signin
    await signIn("credentials", {
      email,
      password,
      // later we will have here callback when we implement it
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
