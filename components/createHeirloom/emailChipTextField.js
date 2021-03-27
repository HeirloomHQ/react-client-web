import React, { useState, useRef } from "react";
import Close from "../icons/close";

const textStyles = "text-grey-darker font-sans";

export default function EmailChipTextField({
  emails,
  onAddEmail,
  onDeleteEmail,
  className,
  error,
  maxCharacters,
  rows,
  id,
  ...rest
}) {
  const inputRef = useRef();
  const [currValue, setCurrValue] = useState("");
  const [err, setErr] = useState();
  const handleKeyPress = (event) => {
    const value = currValue.trim();
    if (event.key === "Enter" && value !== "") {
      if (!validateEmail(value)) {
        setErr("Not a valid email");
        return;
      }
      onAddEmail(value);
      setCurrValue("");
    }
    if (!!err) {
      setErr();
    }
  };

  return (
    <div className={className}>
      <div
        className={[
          textStyles,
          "bg-outlineButtonHover px-3 py-2 w-full flex flex-wrap justify-start",
          "rounded-lg border focus:border-none focus:outline-none focus:ring-2 focus:ring-heirloomOrange",
          !!error ? "border-red-700" : "",
        ].join(" ")}
      >
        {emails.map((email) => (
          <div key={email} className="mx-1 border border-gray-300 rounded px-2 my-1 flex">
            {email}
            <button
              className="ml-1 my-auto focus:outline-none hover:bg-gray-200 rounded"
              onClick={() => onDeleteEmail(email)}
            >
              <Close className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          className="border-none outline-none bg-transparent my-auto flex-grow"
          onKeyDown={handleKeyPress}
          value={currValue}
          onChange={(e) => {
            setCurrValue(e.target.value);
          }}
          {...rest}
        />
      </div>
      <p className={"font-sans text-red-500 " + (err ? "mt-2" : "mt-16")}>{err}</p>
    </div>
  );
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
