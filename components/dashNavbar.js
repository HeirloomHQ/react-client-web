import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import NavLink from "./navLink";

export default function DashNavbar() {
  const router = useRouter();
  return (
    <>
      <div className="w-full flex items-center px-24 py-3 bg-paper">
        <Image
          src="/assets/img/heirloom-logo-no-txt.png"
          alt="Heirloom logo"
          height={30}
          width={30}
          onClick={() => router.push("/")}
        />
        <div className="ml-auto flex">
          <NavLink
            className="font-body flex items-center"
            onClick={() => window.alert("help")}
          >
            Help
          </NavLink>
          {/*temp dropdown*/}
          <div className="flex items-center ml-4">
            <Image src="/assets/img/account-circle.svg" width={36} height={36} />
            <div className="font-body ml-4 mr-2">Account</div>
            <Image src="/assets/img/down.svg" width={10} height={10} />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
