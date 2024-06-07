'use client'
// it will have interactive interfaces

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
    const onClick = () =>{
        console.log("LOGIN BUTTON CLICKED")
    }
    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}