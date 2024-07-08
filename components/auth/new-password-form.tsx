// we are not exporting as default since it is NOT a page and it is just a component
"use client";
// since we are using hook
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { NewPasswordSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-errors";
import { FormSuccess } from "../form-success";
import { newPassword } from "@/actions/new-password";
import { useSearchParams } from "next/navigation";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")

  const [error,setError] = useState<string | undefined>("");
  const [success,setSuccess] = useState<string | undefined>("");
  const [isPending,startTransition]=useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values:z.infer<typeof NewPasswordSchema>)=>{
    // Everytime we hit the new submit then we will clear all successs and error message
    setError("");
    setSuccess("");
    
    console.log(values);
    startTransition(()=>{
      newPassword(values,token)
        .then((data)=>{
          setError(data?.error);
          // Add when we add 2FA
          // 2 factor code has been sent
          setSuccess(data?.success);
        })
    })
    // if we didn't want to do the server action then we could do in such a way 
    // axios.post("/your/api/route",values)
  }

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"    
        >
            <div className="space-y-4">
                <FormField 
                    control={form.control}
                    name="password"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                disabled={isPending}
                                placeholder="*******"
                                type="password"
                                />
                            </FormControl>
                            {/* Message of the form , we can also change this message by going in the Login Schema*/
                            // email:z.string().email({
                            //  message:"Email is Required"
                            // })
                           }
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            {/* only one of the message will be visible */}
            {/* <FormError message="Something went Wrong"/> */}
            {/* <FormSuccess message="Email Sent"/> */}
            <FormError message={error }/>
            <FormSuccess message={success}/>
            {/* Button component */}
            <Button
                type="submit"
                className="w-full"
                disabled={isPending}
            >
                Reset Password
            </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
