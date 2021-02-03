import React from "react";

export default function Button({ children, variant, onClick }) {
  let buttonStyle;
  switch (variant) {
    case "filled":
      buttonStyle = "bg-heirloomOrange text-white";
      break;
    case "transparent":
    default:
      buttonStyle = "text-black";
  }

  return (
    <button
      className={`${buttonStyle} font-medium py-2 px-6 rounded-lg font-body`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
