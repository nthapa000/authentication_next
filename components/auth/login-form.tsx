// we are not exporting as default since it is NOT a page and it is just a component
"use client";
// since we are using hook
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values:z.infer<typeof LoginSchema>)=>{
    console.log(values);
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
            <FormSuccess message="Email Sent"/>
            {/* Button component */}
            <Button
                type="submit"
                className="w-full"
            >
              Login      
            </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
