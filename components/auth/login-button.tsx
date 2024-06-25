'use client'
// it will have interactive interfaces

import { useRouter } from "next/navigation";

interface LoginButtonProps{
    children:React.ReactNode;
    mode?:"modal"|"redirect";
    asChild?:boolean;
}

// Auth Components called LoginButton
// if user doesn't pass anything then it will redirect
export const LoginButton = ({
    children,
    mode="redirect",
    asChild
}:LoginButtonProps) =>{
    const router = useRouter();

    const onClick = () =>{
        // console.log("LOGIN BUTTON CLICKED")
        router.push("/auth/login");
        // this will be our login route in future
        
    }

    if(mode=="modal"){
        return (
            <span>
                TODO: implement modal
            </span>
        )
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}