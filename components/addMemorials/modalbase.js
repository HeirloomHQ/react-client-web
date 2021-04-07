import React, { useEffect, useState } from "react";

import styles from "../heirloomSettingsModal/modal.module.css";

export default function ModalBase({ children, open, onClose }) {

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // this prevents clicks from inside modal from closing it
  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div
      className={[
        !open ? "opacity-0 pointer-events-none" : "",
        styles.modal,
        "transition-opacity duration-300",
        "z-50 w-full h-full flex justify-center items-center",
        "py-16",
      ].join(" ")}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg my-auto w-full flex flex-col max-w-screen-md"
        onClick={stopPropagation}
      >
        {children}
      </div>
    </div>
  );
}
