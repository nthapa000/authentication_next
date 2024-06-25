"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps{
    href:string;
    label:string;
}

export const BackButton = ({
    href,
    label,
}:BackButtonProps) => {
    return(
        <Button 
            variant="link"
            className="font-normal w-full"
            size="sm"
            asChild
            // so that we can properly render the link property which is inside
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}