import React, { useState } from "react";
import OutsideAlerter from "../outsideAlerter";
import Chevron from "../icons/chevron";
import Check from "../icons/check";

export default function RoleDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  function DropdownText() {
    switch (value) {
      case "MANAGER":
        return "Admin";
      case "MEMBER":
      default:
        return "Member";
    }
  }

  return (
    <div className="relative inline-block ml-auto w-36">
      <div
        className={[
          !open ? "" : "opacity-0 pointer-events-none",
          "transition duration-100 ease-in-out",
          "inline-flex justify-end w-full px-4 py-2 hover:bg-gray-100 focus:outline-none",
          "font-medium font-sans",
        ].join(" ")}
        onClick={() => setOpen(true)}
      >
        <DropdownText />
        <Chevron className="-mr-1 ml-4 my-auto" />
      </div>

      <OutsideAlerter onClick={() => setOpen(false)}>
        <div
          className={[
            open
              ? "transform-none z-10"
              : "opacity-0 pointer-events-none transform -translate-y-6",
            "transition duration-100 ease-in-out",
            "origin-top-right absolute right-0 top-0 w-96",
            "rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100",
          ].join(" ")}
          role="menu"
        >
          <RoleDropdownItem
            value="MANAGER"
            label="Admin"
            selected={value === "MANAGER"}
            onClick={() => {
              setOpen(false);
              onChange("MANAGER");
            }}
          >
            <div className="text-left font-sans">
              <div>Admin</div>
              <div className="text-xs text-gray-500 mt-1">
                Can change page settings and invite new members to the memorial page
              </div>
            </div>
          </RoleDropdownItem>
          <RoleDropdownItem
            value="MEMBER"
            label="Member"
            selected={value === "MEMBER"}
            onClick={() => {
              setOpen(false);
              onChange("MEMBER");
            }}
          >
            <div className="text-left font-sans">
              <div>Member</div>
              <div className="text-xs text-gray-500 mt-1">
                Cannot change page settings and invite new members. Can submit content.
              </div>
            </div>
          </RoleDropdownItem>
        </div>
      </OutsideAlerter>
    </div>
  );
}

export function RoleDropdownItem({ children, selected, value, onClick }) {
  return (
    <button
      className="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900 inline-flex justify-start w-full focus:outline-none"
      role="menuitem"
      value={value}
      onClick={onClick}
    >
      {children}
      {selected && <Check className="-mr-1 ml-auto my-auto" />}
    </button>
  );
}
