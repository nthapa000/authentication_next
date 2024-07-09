"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  // Now we will always know which path we are in
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">
            Server
            {/* Clicking on it we get 404 */}
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">
            Client
            {/* Clicking on it we get 404 */}
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/admin" ? "default" : "outline"}
        >
          <Link href="/admin">
            Admin
            {/* Clicking on it we get 404 */}
          </Link>
        </Button>
        {/* Now we want to dynamically change the button type to indicate that we are in this page or NOT */}
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <UserButton ></UserButton>
    </nav>
  );
};
