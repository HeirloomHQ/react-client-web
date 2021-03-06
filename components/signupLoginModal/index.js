import React from "react";
import Image from "next/image";

import Close from "../icons/close";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function SignupLoginModal({ open, variant, onClose, toggleVariant }) {
  React.useEffect(() => {
    function handleEscapeKey(event) {
      if (event.keyCode === 27 && open) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [open, onClose]);

  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div
      className={`z-50 ${
        !open && "opacity-0 pointer-events-none"
      } transition-opacity duration-300 fixed w-full h-full top-0 left-0 flex items-center justify-center`}
    >
      <div
        className="modal-overlay absolute w-full h-full opacity-90 placeholder-"
        style={{ background: "#FEF9F5" }}
        onClick={onClose}
      />

      <div
        className="modal-container bg-white w-full max-w-3xl mx-auto rounded-2xl shadow-lg z-50 overflow-y-auto"
        onClick={stopPropagation}
      >
        <div className="modal-content py-8 text-left px-12">
          <div className="flex justify-between items-center pb-3">
            <div className="invisible" onClick={onClose}>
              <Close />
            </div>
            <Image
              src="/assets/img/newlogo.png"
              alt="Heirloom logo"
              height={36}
              width={26}
            />
            <div className="modal-close cursor-pointer z-50" onClick={onClose}>
              <Close />
            </div>
          </div>
          {variant === "signIn" ? (
            <LoginForm />
          ) : (
            <SignupForm toggleVariant={toggleVariant} />
          )}
        </div>
      </div>
    </div>
  );
}
