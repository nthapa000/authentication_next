// we are not exporting as default since it is NOT a page and it is just a component

import { CardWrapper } from "./card-wrapper"


export const LoginForm = ()=>{
    return(
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial
        >
            Login Form
        </CardWrapper>

    )
}