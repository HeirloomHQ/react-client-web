import React from "react";

const textStyles = "text-lg text-grey-darker font-sans";

export default function TextField({
  className,
  id,
  name,
  placeholder,
  value,
  onChange,
  type,
  error,
  onBlur,
}) {
  return (
    <input
      className={[
        className,
        textStyles,
        "bg-outlineButtonHover px-3 py-2",
        "rounded-lg border focus:border-none focus:outline-none focus:ring-2 focus:ring-heirloomOrange",
        !!error ? "border-red-700" : "",
      ].join(" ")}
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange && onChange}
      onBlur={onBlur}
    />
  );
}
