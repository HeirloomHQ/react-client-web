import React from "react";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";

export default function PageNavbar() {


    const router = useRouter();
	const memorial_id = router.query.mem_id
    const firstname = router.query?.firstname
    const lastname = router.query?.lastname
  return (
    <>
      <div className="w-full flex items-center px-24 py-4 bg-paper">
        <div className="mx-auto flex  items-center">
        <input type="image"
          src="/assets/img/back-home-button.png"
          alt="Heirloom logo"
          height={35}
          width={40}
          onClick={() => router.push("/home")}
        />
        </div>
        <div className="flex ">
        <input type="image"
          src="/assets/img/add-new-button.png"
          alt="Heirloom logo"
          height={30}
          width={30}
        />
        </div>
      </div>
      <hr />
    </>
  );
}
