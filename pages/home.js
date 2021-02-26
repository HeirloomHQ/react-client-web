import { useState } from "react";
import Head from "next/head";
import Button from "../components/button";
import DashNavbar from "../components/dashNavbar";
import MemorialCard from "../components/memorialCard";
import HeirloomSettingsModal from "../components/heirloomSettingsModal";
import SelectedRectangle from "../components/selectedRectangle";

export default function Home() {
  const [tab, setTab] = useState(0);
  const [memorialID, setMemorialID] = useState(undefined);

  function openSettings(memorialID) {
    setMemorialID(memorialID);
  }

  function closeSettings() {
    setMemorialID(undefined);
  }

  return (
    <>
      <Head>
        <title>Heirloom | My Heirlooms</title>
      </Head>
      <div className="bg-paper min-h-screen">
        <DashNavbar />

        {/*Dash header*/}
        <div className="flex flex-col sm:px-60 2xl:px-0 pt-10 w-full bg-paper shadow-lg">
          <div className="2xl:max-w-4xl 2xl:w-full 2xl:mx-auto">
            <div className="flex justify-between">
              <h1 className="text-3xl font-sans font-extrabold text-text-default">
                My Heirlooms
              </h1>
              <Button variant="filled">+&nbsp;&nbsp;&nbsp;Create an Heirloom</Button>
            </div>
            <div className="mt-6 flex flex-start">
              <button
                className="mr-5 text-text-default font-sans font-semibold focus:outline-none"
                onClick={() => setTab(0)}
              >
                <h2 className="mb-4 select-none">Home</h2>
                {tab === 0 && <SelectedRectangle />}
              </button>
              <button
                className="mx-5 text-text-default font-sans font-semibold focus:outline-none"
                onClick={() => setTab(1)}
              >
                <h2 className="mb-4 select-none">Invites</h2>
                {tab === 1 && <SelectedRectangle />}
              </button>
              <button
                className="mx-5 text-text-default font-sans font-semibold focus:outline-none"
                onClick={() => setTab(2)}
              >
                <h2 className="mb-4 select-none">Notifications</h2>
                {tab === 2 && <SelectedRectangle />}
              </button>
            </div>
          </div>
        </div>

        {/*Memorial Grid*/}
        <div className="sm:px-60 2xl:px-0 mt-12 grid sm:grid-cols-2 2xl:max-w-4xl 2xl:w-full 2xl:mx-auto md:grid-cols-3  gap-12">
          <MemorialCard />
        </div>
      </div>
      <HeirloomSettingsModal
        open={!!memorialID}
        onClose={closeSettings}
        memorialID={memorialID}
      />
    </>
  );
}
