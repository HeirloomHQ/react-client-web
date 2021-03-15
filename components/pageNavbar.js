import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import { useUser, useUserMock } from "../lib/clientSideAuth";
import { useMemorials, useMemorialsMock } from "../lib/memorial";

export default function PageNavbar() {


    const router = useRouter();
	const memorial_id = router.query.mem_id
    const firstname = router.query?.firstname
    const lastname = router.query?.lastname
  return (
    <>
      <div className="w-full flex items-center px-24 py-3 bg-paper">
        <Image
          src="/assets/img/back-button.png"
          alt="Heirloom logo"
          height={30}
          width={30}
          onClick={() => router.push("/home")}
        />
        <div className="mx-auto flex items-center">
            <div className="font-display  text-2xl ml-4 mr-2">  {firstname} {lastname}</div>
        </div>
      </div>
      <hr />
    </>
  );
}
