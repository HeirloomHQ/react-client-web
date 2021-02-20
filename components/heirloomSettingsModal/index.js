import React, { useEffect, useState } from "react";

import styles from "./modal.module.css";
import LoadingSpinner from "../loadingSpinner";
import { useMemorial } from "../../lib/memorial";
import SelectedRectangle from "../selectedRectangle";
import HeirloomSettings from "./settings";
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
        "py-14 sm:px-48 2xl:px-0",
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
      case 1:
      case 2:
      case 3:
      default:
        return <HeirloomSettings />;
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
    return (
      <div className="mt-8 flex flex-start">
        <div
          className="mr-6 text-text-default font-sans font-semibold"
          onClick={() => setTab(0)}
        >
          <h2 className="mb-4 select-none">Settings</h2>
          {tab === 0 && <SelectedRectangle />}
        </div>
        <div
          className="mx-6 text-text-default font-sans font-semibold"
          onClick={() => setTab(1)}
        >
          <h2 className="mb-4 select-none">Sharing</h2>
          {tab === 1 && <SelectedRectangle />}
        </div>
        <div
          className="mx-6 text-text-default font-sans font-semibold"
          onClick={() => setTab(2)}
        >
          <h2 className="mb-4 select-none">Donations</h2>
          {tab === 2 && <SelectedRectangle />}
        </div>
        <div
          className="mx-6 text-text-default font-sans font-semibold"
          onClick={() => setTab(3)}
        >
          <h2 className="mb-4 select-none">Billing</h2>
          {tab === 3 && <SelectedRectangle />}
        </div>
      </div>
    );
  }

  return loading || !memorial ? (
    <LoadingSpinner />
  ) : (
    <>
      <Spacer>
        <h2 className="font-sans font-semibold text-3xl">
          {memorial.pageSettings.firstName}&apos;s Heirloom
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
  return <div className={`${className} px-20`}>{children}</div>;
}
