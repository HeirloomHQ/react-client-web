import React from "react";
import Spinner from "./icons/spinner";

export default function LoadingSpinner() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner className="animate-spin" />
    </div>
  );
}
