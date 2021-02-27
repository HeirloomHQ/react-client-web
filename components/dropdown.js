import React, { useState } from "react";
import Button from "./button";
import OutsideAlerter from "./outsideAlerter";
import Chevron from "./icons/chevron";
import Check from "./icons/check";

export default function Dropdown({ children, value, onChange }) {
  const [open, setOpen] = useState(false);

  const childrenArray = React.Children.toArray(children);

  const chosenIndex = childrenArray.map((child) => child.props.value).indexOf(value);
  const chosenChild = childrenArray[chosenIndex];

  return (
    <div className="relative inline-block text-left w-96">
      <Button
        className={[
          !open ? "" : "opacity-0 pointer-events-none",
          "transition duration-100 ease-in-out",
          "inline-flex justify-start font-medium font-sans w-full",
        ].join(" ")}
        onClick={() => setOpen(true)}
      >
        {chosenChild.props.children}
        <Chevron className="-mr-1 ml-auto my-auto" />
      </Button>

      <OutsideAlerter onClick={() => setOpen(false)}>
        <div
          className={[
            open
              ? "transform-none"
              : "opacity-0 pointer-events-none transform -translate-y-6",
            "transition duration-100 ease-in-out",
            "origin-top-right absolute left-0 top-0 w-full",
            "rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100",
          ].join(" ")}
          role="menu"
        >
          {childrenArray.map((child) =>
            React.cloneElement(child, {
              selected: child.props.value === value,
              onClick: (e) => {
                onChange(e);
                setOpen(false);
              },
            })
          )}
        </div>
      </OutsideAlerter>
    </div>
  );
}

export function DropdownItem({ children, selected, value, onClick }) {
  return (
    <button
      className="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900 inline-flex justify-start w-full focus:outline-none"
      role="menuitem"
      value={value}
      onClick={(e) => onClick && onClick(e)}
    >
      {children}
      {selected && <Check className="-mr-1 ml-auto my-auto" />}
    </button>
  );
}
