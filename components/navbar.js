import React, { useState } from "react";
import Image from "next/image";
import Button from "./button";
import SignupLoginModal from "./signupLoginModal";
import { useRouter } from "next/router";

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState("signIn");
  const openModal = (variant) => {
    setModalVariant(variant);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const router = useRouter();

  return (
    <>
      <div className="h-24 w-full flex items-center px-24 bg-paper">
        <Image
          src="/assets/img/heirloom-header-logo.png"
          alt="Heirloom logo"
          height={42}
          width={170}
          onClick={() => router.push("/")}
        />
        <div className="flex justify-between ml-32">
          <NavLink href="#">Product</NavLink>
          <NavLink href="#">Pricing</NavLink>
          <NavLink href="#">Blog</NavLink>
          <NavLink href="#">About</NavLink>
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
      <SignupLoginModal
        open={modalOpen}
        onClose={closeModal}
        variant={modalVariant}
        toggleVariant={() =>
          setModalVariant(modalVariant === "signIn" ? "signUp" : "signIn")
        }
      />
    </>
  );
}

function NavLink({ href, children }) {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    return router.push(href);
  };

  return (
    <a
      className="font-body font-medium text-xl hover:underline mx-6"
      href={href}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
