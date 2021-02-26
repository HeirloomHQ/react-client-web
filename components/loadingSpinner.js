import React from "react";
import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image
        className="animate-spin"
        src="/assets/img/spinner.png"
        height={24}
        width={24}
      />
    </div>
  );
}
