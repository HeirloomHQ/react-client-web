import React, { useState } from "react";

const textStyles = "text-grey-darker font-sans";

export default function TextField({ className, error, maxCharacters, rows, ...rest }) {
  const [characterCount, setCharacterCount] = useState(rest.value?.length || 0);

  const showCharacterCount = maxCharacters !== undefined;

  const onChange = (event) => {
    if (showCharacterCount) {
      event.persist();
      const { value } = event.target;
      setCharacterCount(value.length);
    }
    !!rest.onChange && rest.onChange(event);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        className={[
          textStyles,
          "bg-outlineButtonHover py-2 w-full rounded-lg ",
          "border focus:border-none focus:outline-none focus:ring-2 focus:ring-heirloomOrange",
          !!error ? "border-red-700" : "",
          showCharacterCount ? "pl-3 pr-20" : "px-3",
        ].join(" ")}
        onChange={onChange}
        {...rest}
      />
      {showCharacterCount && (
        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-2 text-gray-500">
          {characterCount}/{maxCharacters || 100}
        </span>
      )}
    </div>
  );
}
