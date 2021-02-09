import React from "react";

export default function Button({
  children,
  className,
  variant,
  onClick,
  fullWidth,
  disabled,
}) {
  let buttonStyle = `${className} ${fullWidth && "w-full"} `;
  switch (variant) {
    case "filled":
      buttonStyle += `${
        !disabled
          ? "bg-heirloomOrange hover:bg-heirloomOrange-dark"
          : "bg-heirloomOrange-light"
      }  text-white`;
      break;
    case "transparent":
    default:
      buttonStyle += "text-black";
  }

  return (
    <button
      className={`${buttonStyle} font-medium py-2 px-6 rounded-lg font-body`}
      onClick={() => {
        if (!disabled && !!onClick) onClick();
      }}
    >
      {children}
    </button>
  );
}
