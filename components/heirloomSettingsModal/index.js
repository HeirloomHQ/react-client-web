import React, { useEffect, useState } from "react";

import styles from "./modal.module.css";
import SelectedRectangle from "../selectedRectangle";
import HeirloomSettings from "./settings";
import SharingTab from "./sharing";
import PrivacyTab from "./privacy";
import { useMemorial } from "../../lib/memorial";
import { useMembers } from "../../lib/members";

export default function HeirloomSettingsModal() {
  // this prevents the background from scrolling when modal is open
  const { memorial, setMemorial } = useMemorial();
  const { members, loading } = useMembers();

  const open = !!memorial;
  const onClose = () => setMemorial(undefined);

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
        "py-12 sm:px-48 2xl:px-0",
      ].join(" ")}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg h-full w-full 2xl:max-w-screen-lg pt-10 flex flex-col"
        onClick={stopPropagation}
      >
        {!!memorial && (
          <ModalContent
            memorial={memorial}
            onClose={onClose}
            members={members}
            loadingMembers={loading}
          />
        )}
      </div>
    </div>
  );
}

function ModalContent({ memorial, onClose, loadingMembers, members }) {
  const [tab, setTab] = useState(0);

  function ContentRender() {
    switch (tab) {
      case 0:
      default:
        return <HeirloomSettings memorial={memorial} onClose={onClose} />;
      case 1:
        return <></>;
      case 2:
        return <SharingTab members={members} loading={loadingMembers} />;
      case 3:
        return <></>;
      case 4:
        return <></>;
      case 5:
        return <PrivacyTab />;
    }
  }

  function disabledButtons(title){
    if(title == "Media" || title == "Donations" || title == "Billing"){
      return true;
    }
    return false;
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
            } ${disabledButtons(title) ? "text-gray-400" : "text-text-default"} font-sans font-semibold focus:outline-none`}
            onClick={() => setTab(num)}
            key={title}
            disabled={disabledButtons(title) ? "true" : ""}
          >
            <h2 className="mb-4 select-none">{title}</h2>
            {tab === num && <SelectedRectangle />}
          </button>
        ))}
      </div>
    );
  }

  return (
    <>
      <Spacer>
        <h2 className="font-sans font-semibold text-3xl">
          {memorial.firstName}&apos;s Heirloom
        </h2>
        <MenuBar />
      </Spacer>
      <hr />
      <ContentRender />
    </>
  );
}

function Spacer({ className, children }) {
  return <div className={`${className} px-16`}>{children}</div>;
}
