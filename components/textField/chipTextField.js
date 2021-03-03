import React, { useState, useRef } from "react";
import Close from "../icons/close";

const textStyles = "text-grey-darker font-sans";

export default function ChipTextField({
  className,
  error,
  maxCharacters,
  rows,
  id,
  ...rest
}) {
  const inputRef = useRef();
  const [currValue, setCurrValue] = useState("");
  const [chips, setChips] = useState([]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && currValue.trim() !== "") {
      setChips([...chips, currValue.trim()]);
      setCurrValue("");
    }
  };

  const deleteChip = (index) => {
    setChips(chips.filter((_, i) => i !== index));
  };

  return (
    <div
      className={[
        className,
        textStyles,
        "bg-outlineButtonHover px-3 py-2 w-full flex flex-wrap justify-start",
        "rounded-lg border focus:border-none focus:outline-none focus:ring-2 focus:ring-heirloomOrange",
        !!error ? "border-red-700" : "",
      ].join(" ")}
    >
      {chips.map((chip, i) => (
        <div key={chip} className="mx-1 border border-gray-300 rounded px-2 my-1 flex">
          {chip}
          <button
            className="ml-1 my-auto focus:outline-none hover:bg-gray-200 rounded"
            onClick={() => deleteChip(i)}
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
  );
}
