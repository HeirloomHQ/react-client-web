import React from "react";

export default function Spinner({ className }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="18" y="11" width="6" height="2" rx="1" fill="#FF7F59" />
      <rect opacity="0.4" y="11" width="6" height="2" rx="1" fill="#FF7F59" />
      <rect
        opacity="0.7"
        x="13"
        width="6"
        height="2"
        rx="1"
        transform="rotate(90 13 0)"
        fill="#FF7F59"
      />
      <rect
        opacity="0.1"
        x="13"
        y="18"
        width="6"
        height="2"
        rx="1"
        transform="rotate(90 13 18)"
        fill="#FF7F59"
      />
      <rect
        opacity="0.5"
        x="2.10742"
        y="5.13403"
        width="6"
        height="2"
        rx="1"
        transform="rotate(30 2.10742 5.13403)"
        fill="#FF7F59"
      />
      <rect
        opacity="0.8"
        x="18.8662"
        y="2.10767"
        width="6"
        height="2"
        rx="1"
        transform="rotate(120 18.8662 2.10767)"
        fill="#FF7F59"
      />
      <rect
        opacity="0.2"
        x="9.86621"
        y="17.6962"
        width="6"
        height="2"
        rx="1"
        transform="rotate(120 9.86621 17.6962)"
        fill="#FF7F59"
      />
      <rect
        opacity="0.7"
        x="6.86621"
        y="1.10767"
        width="6"
        height="2"
        rx="1"
        transform="rotate(60 6.86621 1.10767)"
        fill="#FF7F59"
      />
      <rect
        opacity="0.9"
        x="22.8926"
        y="6.86621"
        width="6"
        height="2"
        rx="1"
        transform="rotate(150 22.8926 6.86621)"
        fill="#FF7F59"
      />
      <rect
        opacity="0.3"
        x="7.30371"
        y="15.8662"
        width="6"
        height="2"
        rx="1"
        transform="rotate(150 7.30371 15.8662)"
        fill="#FF7F59"
      />
    </svg>
  );
}
