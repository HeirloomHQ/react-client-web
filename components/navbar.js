import React from "react";
import Image from "next/image";
import Button from "./button";

export default function Navbar({ onClick }) {
  return (
    <div className="h-24 w-full flex items-center px-24">
      <Image
        src="/assets/heirloom-header-logo.png"
        alt="Heirloom logo"
        height={42}
        width={170}
        onClick={onClick}
      />

      <div className="flex justify-between ml-32">
        <NavLink href="#">Product</NavLink>
        <NavLink href="#">Pricing</NavLink>
        <NavLink href="#">Blog</NavLink>
        <NavLink href="#">About</NavLink>
      </div>

      <div className="ml-auto">
        <Button>Sign in</Button>
        <Button variant="filled">Sign Up</Button>
      </div>
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <a className="font-body font-medium text-xl hover:underline mx-6" href={href}>
      {children}
    </a>
  );
}
