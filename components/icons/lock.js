import React from "react";

export default function Lock({ className }) {
  return (
    <svg
      className={className}
      width="15"
      height="19"
      viewBox="0 0 15 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.65 4.5C3.65 2.3737 5.3737 0.65 7.5 0.65C9.6263 0.65 11.35 2.3737 11.35 4.5V7.65H3.65V4.5Z"
        stroke="#1F1F1F"
        strokeWidth="1.3"
      />
      <rect
        x="0.65"
        y="7.65"
        width="13.7"
        height="10.7"
        rx="2.35"
        stroke="#1F1F1F"
        strokeWidth="1.3"
      />
    </svg>
  );
}
