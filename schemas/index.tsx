import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
      message:"Email is required"
    }),
    password: z.string().min(1,{
      message:"Password is required" 
      // Here default message is String must contain at least 1 character this should not be the message since the password is already decided by the users. 
    }),
    // for registering new users we will also add the minimum length of 6 but we should keep it in login since it is possible before we keep min(6) there would have been users who created the password of length less than 6
    // 
  }); 