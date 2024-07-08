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

import { ResetSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-errors";
import { FormSuccess } from "../form-success";
import { reset } from "@/actions/reset";

export const ResetForm = () => {
  const [error,setError] = useState<string | undefined>("");
  const [success,setSuccess] = useState<string | undefined>("");
  const [isPending,startTransition]=useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values:z.infer<typeof ResetSchema>)=>{
    // Everytime we hit the new submit then we will clear all successs and error message
    setError("");
    setSuccess("");
    
    console.log(values);
    startTransition(()=>{
      reset(values)
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
      headerLabel="Forgot your password?"
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
              Send reset email      
            </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
