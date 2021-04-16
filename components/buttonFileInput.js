import React from "react";

export default function ButtonFileInput({
  children,
  className,
  id,
  variant,
  onClick,
  disabled,
  onChange,
  ...rest
}) {
  let buttonStyle = "";
  switch (variant) {
    case "filled":
      buttonStyle += `${
        !disabled
          ? "bg-heirloomOrange hover:bg-heirloomOrange-dark"
          : "bg-heirloomOrange-light"
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
    <div className={`${className} py-2`}>
      <label
        className={`${buttonStyle} font-medium py-2 px-4 rounded-lg font-body transition-colors duration-100 box-border`}
        htmlFor={id}
        {...rest}
      >
        {children}
      </label>
      <input
        type="file"
        onChange={onChange}
        className="hidden"
        id={id}
        accept=".png,.PNG,.jpg,.jpeg,.JPG,.JPEG"
      />
    </div>
  );
}
