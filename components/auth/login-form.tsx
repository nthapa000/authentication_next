// we are not exporting as default since it is NOT a page and it is just a component
"use client";
// since we are using hook
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { LoginSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-errors";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
  ? "Email already in use with the different provider "
:"";
  const [error,setError] = useState<string | undefined>("");
  const [success,setSuccess] = useState<string | undefined>("");
  const [isPending,startTransition]=useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values:z.infer<typeof LoginSchema>)=>{
    // Everytime we hit the new submit then we will clear all successs and error message
    setError("");
    setSuccess("");
    
    startTransition(()=>{
      login(values)
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
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"    
        >
            <div className="space-y-4">
                <FormField 
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                disabled={isPending}
                                placeholder="john.wick@don.com"
                                type="email"
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
                <FormField 
                    control={form.control}
                    name="password"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                placeholder="*********"
                                type="password"
                                disabled={isPending}
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
            <FormError message={error || urlError}/>
            <FormSuccess message={success}/>
            {/* Button component */}
            <Button
                type="submit"
                className="w-full"
                disabled={isPending}
            >
              Login      
            </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
