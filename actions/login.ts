"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { getVerificationToken , generateTwoFactorToken} from "@/lib/token";
import { sendVerificationEmail,sendTwoFactorTokenEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorTokenByEmail } from "@/data/two-factor";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";



// since we are using promises
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password ,code} = validateFields.data;
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

  if(existingUser.isTwoFactorEnabled && existingUser.email){
    if(code){
      // TODO: Verifiy code
      const twoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email
      );

      if(!twoFactorToken){
        return {error:"Invalid code!"}
      }

      if(twoFactorToken.token!== code){
        return {error:"Invalid code!"};
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if(hasExpired){
        return {error:"Code expired!!"};
      }

      await db.twoFactorToken.delete({
        where:{id:twoFactorToken.id}
      });

      const exisitngConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if(exisitngConfirmation){
        await db.twoFactorConfirmation.delete({
          where: {id:exisitngConfirmation.id}
        })
      }

      await db.twoFactorConfirmation.create({
        data:{
          userId:existingUser.id
        }
      })
      // rest workflow of deleting the 2FA after login is in auth.ts
    }else{
    const twoFactorToken = await generateTwoFactorToken(existingUser.email)
    await sendTwoFactorTokenEmail(
      twoFactorToken.email,
      twoFactorToken.token,
    );

    return {twoFactor: true};
  }
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
