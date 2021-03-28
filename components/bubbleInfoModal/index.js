import React from "react";
import BubbleInfo from "./bubbleInfo";
import Close from "../icons/close";

export default function BubbleInfoModal({ open, onClose  }) {

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
            <div className="modal-close cursor-pointer z-50" onClick={onClose}>
              <Close />
            </div>
          </div>
            <BubbleInfo />
        </div>
      </div>
    </div>
  );
}
