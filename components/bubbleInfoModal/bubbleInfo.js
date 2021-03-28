import React from "react";
import Image from "next/image";

export default function bubbleInfo() {

  return (
    <>
      <div className="mt-8 my-5 justify-center"> 
      <Image
          src="/assets/img/mockImages/4.png"
          alt="Heirloom logo"
          // layout='fill'
          height={170}
          width={170}
          // onClick={() => router.push("/")}
        />
      </div>
      {/* <hr className="solid my-5" /> */}
    </>
  );
}
