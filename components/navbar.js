import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "./button";
import SignupLoginModal from "./signupLoginModal";
import NavLink from "./navLink";

export default function Navbar({ openModal }) {
  const router = useRouter();

  return (
    <>
      <div className="h-24 w-full flex items-center px-24 bg-paper cursor-pointer">
        <Image
          src="/assets/img/nav-logo.png"
          alt="Heirloom logo"
          height={36}
          width={147}
          onClick={() => router.push("/")}
        />
        <div className="flex justify-between ml-32">
          <NavLink className="font-body font-medium text-xl " href="#">
            Product
          </NavLink>
          <NavLink className="font-body font-medium text-xl " href="#">
            Pricing
          </NavLink>
          <NavLink className="font-body font-medium text-xl " href="#">
            Blog
          </NavLink>
          <NavLink className="font-body font-medium text-xl " href="#">
            About
          </NavLink>
        </div>

        <div className="ml-auto">
          <Button className="mr-1" onClick={() => openModal("signIn")}>
            Sign in
          </Button>
          <Button onClick={() => openModal("signUp")} variant="filled">
            Sign Up
          </Button>
        </div>
      </div>
    </>
  );
}
