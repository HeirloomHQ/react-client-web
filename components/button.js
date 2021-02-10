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
    case "outlined":
      buttonStyle +=
        "text-black border-solid border border-black hover:text-white hover:border-opacity-0 hover:bg-heirloomOrange-light";
      break;
    case "transparent":
    default:
      buttonStyle += "text-black  hover:bg-heirloomOrange-light hover:text-white";
  }

  return (
    <button
      className={`${buttonStyle} font-medium py-2 px-6 rounded-lg font-body transition-colors duration-100`}
      onClick={() => {
        if (!disabled && !!onClick) onClick();
      }}
    >
      {children}
    </button>
  );
}
