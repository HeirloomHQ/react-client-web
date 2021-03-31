import React from "react";

export default function Button({
  children,
  className,
  variant,
  onClick,
  fullWidth,
  disabled,
  type,
}) {
  let buttonStyle = `${className} ${fullWidth && "w-full"} `;
  switch (variant) {
    case "filled":
      buttonStyle += `${
        !disabled
          ? "bg-heirloomOrange hover:bg-heirloomOrange-dark"
          : "bg-heirloomOrange-light pointer-events-none"
      }  text-white`;
      break;
    case "outlined":
    default:
      buttonStyle += [
        "text-black border-solid border",
        "hover:bg-outlineButtonHover",
      ].join(" ");
  }

  return (
    <button
      className={`${buttonStyle} font-medium py-2 px-4 rounded-lg font-body transition-colors duration-100 focus:outline-none`}
      onClick={() => {
        if (!disabled && !!onClick) onClick();
      }}
      type={type || "button"}
    >
      {children}
    </button>
  );
}
