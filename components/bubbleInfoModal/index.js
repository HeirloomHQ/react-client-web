import React from "react";
import BubbleInfo from "./bubbleInfo";
import Close from "../icons/close";
import Image from "next/image";
import RightChevron from '../icons/rightchevron';
import LeftChevron from '../icons/leftchevron';

export default function BubbleInfoModal({ open, onClose, bubble }) {
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
        className="modal-container bg-white bg-opacity-0 w-full  max-h-3xl max-w-3xl mx-auto rounded-3xl z-50 overflow-y-auto"
        onClick={stopPropagation}
      >
        <div className="modal-content py-8 text-left px-12 ">
          <div className="flex justify-between items-center pb-3 h-100 w-100">
            {/* <div className="invisible" onClick={onClose}>
              <Close />
            </div> */}
            <div className="modal-close cursor-pointer z-50" onClick={onClose}>

              <LeftChevron />
            </div>
            <div
            style={{
              backgroundImage: `url(${bubble.mediaUrl})`,
              backgroundSize: "cover",
                  backgroundColor: "#FF7F59",
                  height: '600px',
                  width:'600px'

            }}
            // onClick={onClick}
            >
              <div
              style={{
                paddingTop:"100%",
                height: '50px',

              }}> Lorem Ipsum is simply dummy
                text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
             </div>

            </div>

            {/* <Image

              src={url(bubble.mediaUrl}
              alt="Heirloom logo"
              // layout='fill'
              height={600}
              width={600}
              // onClick={() => router.push("/")}
            /> */}
            <div className="modal-close cursor-pointer z-50" onClick={onClose}>

              <RightChevron />
            </div>
          </div>
          <BubbleInfo />
        </div>
      </div>
    </div>
  );
}
