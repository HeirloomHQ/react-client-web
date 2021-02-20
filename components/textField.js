import React from "react";

const textStyles = "text-lg text-grey-darker font-sans";

export default function TextField({ className, error, multiline, rows, ...rest }) {
  return multiline ? (
    <textarea
      className={[
        className,
        textStyles,
        "bg-outlineButtonHover px-3 py-2",
        "rounded-lg border focus:border-none focus:outline-none focus:ring-2 focus:ring-heirloomOrange resize-none",
        !!error ? "border-red-700" : "",
      ].join(" ")}
      rows={rows || 3}
      {...rest}
    />
  ) : (
    <input
      className={[
        className,
        textStyles,
        "bg-outlineButtonHover px-3 py-2",
        "rounded-lg border focus:border-none focus:outline-none focus:ring-2 focus:ring-heirloomOrange",
        !!error ? "border-red-700" : "",
      ].join(" ")}
      {...rest}
    />
  );
}
