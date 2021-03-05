import React from "react";
import styles from "./textField.module.css";

const textStyles = "text-grey-darker font-sans";

export default function TextArea({
  className,
  error,
  maxCharacters,
  rows,
  value,
  ...rest
}) {
  const showCharacterCount = maxCharacters !== undefined;

  return (
    <div
      className={[
        className,
        textStyles,
        "bg-outlineButtonHover px-3 w-full relative",
        "rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-heirloomOrange resize-none",
        !!error ? "border-red-700 border-2" : "border",
        showCharacterCount && "pb-8",
      ].join(" ")}
    >
      <textarea
        className={`${styles.noscrollbar} border-none outline-none bg-transparent w-full resize-none pt-2`}
        rows={rows || 3}
        value={value}
        {...rest}
      />
      {maxCharacters && (
        <span className="absolute right-0 bottom-0 pr-3 pb-2 text-gray-500">
          {value?.length || 0}/{maxCharacters || 100}
        </span>
      )}
    </div>
  );
}
