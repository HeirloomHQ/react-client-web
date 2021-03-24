import React, { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";

import styles from "../heirloomSettingsModal/modal.module.css";
import { useHeirloomCreatContext } from "./hooks";
import IconButton from "@material-ui/core/IconButton";
import SettingLabel from "../heirloomSettingsModal/settingsLabel";
import TextField from "../textField/textField";

export default function ModalBase({ children }) {
  const [state, dispatch] = useHeirloomCreatContext();
  const { isOpen } = state;
  const onClose = () => dispatch({ type: "CLOSE" });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // this prevents clicks from inside modal from closing it
  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div
      className={[
        !isOpen ? "opacity-0 pointer-events-none" : "",
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
