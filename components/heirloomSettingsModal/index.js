import React, { useEffect, useState } from "react";

import styles from "./modal.module.css";
import LoadingSpinner from "../loadingSpinner";
import { useMemorial } from "../../lib/memorial";
import SelectedRectangle from "../selectedRectangle";
import HeirloomSettings from "./settings";
import SharingTab from "./sharing";
import Button from "../button";

export default function HeirloomSettingsModal({ open, onClose, memorialID }) {
  // this prevents the background from scrolling when modal is open
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

  const { loading, memorial } = useMemorial(memorialID);

  return (
    <div
      className={[
        !open ? "opacity-0 pointer-events-none" : "",
        styles.modal,
        "transition-opacity duration-300",
        "z-50 w-full h-full flex justify-center items-center",
        "py-12 sm:px-48 2xl:px-0",
      ].join(" ")}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg h-full w-full 2xl:max-w-screen-lg pt-10 flex flex-col"
        onClick={stopPropagation}
      >
        <ModalContent loading={loading} memorial={memorial} onClose={onClose} />
      </div>
    </div>
  );
}

function ModalContent({ loading, memorial, onClose }) {
  const [tab, setTab] = useState(0);

  function ContentRender() {
    switch (tab) {
      case 0:
      default:
        return <HeirloomSettings />;
      case 1:
        return <></>;
      case 2:
        return <SharingTab memorial={memorial} />;
      case 3:
        return <></>;
      case 4:
        return <></>;
      case 5:
        return <></>;
    }
  }

  function ActionBar() {
    return (
      <>
        <hr />
        <div className="w-full py-5">
          <Spacer>
            <Button variant="filled" className="mr-5">
              Save Changes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Spacer>
        </div>
      </>
    );
  }

  function MenuBar() {
    const MENU_TABS = [
      "General",
      "Media",
      "Sharing",
      "Donations",
      "Billing",
      "Privacy & Settings",
    ];
    return (
      <div className="mt-8 flex flex-start">
        {MENU_TABS.map((title, num) => (
          <button
            className={`${
              num === 0 ? "mr-7" : "mx-7"
            } text-text-default font-sans font-semibold focus:outline-none`}
            onClick={() => setTab(num)}
            key={title}
          >
            <h2 className="mb-4 select-none">{title}</h2>
            {tab === num && <SelectedRectangle />}
          </button>
        ))}
      </div>
    );
  }

  return loading || !memorial ? (
    <LoadingSpinner />
  ) : (
    <>
      <Spacer>
        <h2 className="font-sans font-semibold text-3xl">
          {memorial.firstName}&apos;s Heirloom
        </h2>
        <MenuBar />
      </Spacer>
      <hr />
      <Spacer className="flex-grow overflow-y-auto">
        <ContentRender />
      </Spacer>
      {tab === 0 && <ActionBar />}
    </>
  );
}

function Spacer({ className, children }) {
  return <div className={`${className} px-16`}>{children}</div>;
}
