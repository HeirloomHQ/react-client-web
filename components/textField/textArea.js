import React, { useState } from "react";
import styles from "./textField.module.css";

const textStyles = "text-grey-darker font-sans";

export default function TextArea({ className, error, maxCharacters, rows, ...rest }) {
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
    <div
      className={[
        className,
        textStyles,
        "bg-outlineButtonHover px-3 w-full relative",
        "rounded-lg border focus:border-none focus:outline-none focus:ring-2 focus:ring-heirloomOrange resize-none",
        !!error ? "border-red-700" : "",
        showCharacterCount && "pb-8",
      ].join(" ")}
    >
      <textarea
        className={`${styles.noscrollbar} border-none outline-none bg-transparent w-full resize-none pt-2`}
        onChange={onChange}
        rows={rows || 3}
        {...rest}
      />
      {maxCharacters && (
        <span className="absolute right-0 bottom-0 pr-3 pb-2 text-gray-500">
          {characterCount}/{maxCharacters || 100}
        </span>
      )}
    </div>
  );
}
