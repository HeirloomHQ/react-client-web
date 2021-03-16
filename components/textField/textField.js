import React from "react";

const textStyles = "text-grey-darker font-sans";

export default function TextField({
  className,
  error,
  maxCharacters,
  rows,
  value,
  ...rest
}) {
  const showCharacterCount = maxCharacters !== undefined;

  return (
    <div className={`relative ${className}`}>
      <input
        className={[
          textStyles,
          "bg-outlineButtonHover py-2 w-full rounded-lg ",
          "border focus:border-none focus:outline-none focus:ring-2",
          !!error ? "border-red-700 focus:ring-red-600" : "focus:ring-heirloomOrange",
          showCharacterCount ? "pl-3 pr-20" : "px-3",
        ].join(" ")}
        value={value}
        {...rest}
      />
      {showCharacterCount && (
        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-2 text-gray-500">
          {value?.length || 0}/{maxCharacters || 100}
        </span>
      )}
    </div>
  );
}
