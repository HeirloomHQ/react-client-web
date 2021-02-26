import { useState } from "react";
import Head from "next/head";
import Button from "../components/button";
import DashNavbar from "../components/dashNavbar";
import MemorialCard from "../components/memorialCard";
import HeirloomSettingsModal from "../components/heirloomSettingsModal";
import SelectedRectangle from "../components/selectedRectangle";
import LoadingSpinner from "../components/loadingSpinner";
import { useUserMock } from "../lib/clientSideAuth";
import { useMemorialsMock } from "../lib/memorial";

export default function Home() {
  const [tab, setTab] = useState(0);
  const [selectedMemorial, setSelectedMemorial] = useState(undefined);
  const { loading: userLoading, user } = useUserMock();
  const { loading: memorialsLoading, memorials, roles } = useMemorialsMock(user?.id);

  function openSettings(memorial) {
    setSelectedMemorial(memorial);
  }

  function closeSettings() {
    setSelectedMemorial(undefined);
  }

  function HomeHeader() {
    const TABS = ["Home", "Invites", "Notifications"];
    return (
      <div className="flex flex-col sm:px-60 2xl:px-0 pt-10 w-full bg-paper shadow-lg">
        <div className="2xl:max-w-4xl 2xl:w-full 2xl:mx-auto">
          <div className="flex justify-between">
            <h1 className="text-3xl font-sans font-extrabold text-text-default">
              My Heirlooms
            </h1>
            <Button variant="filled">+&nbsp;&nbsp;&nbsp;Create an Heirloom</Button>
          </div>
          <div className="mt-6 flex flex-start">
            {TABS.map((tabName, i) => (
              <button
                className={`${
                  i === 0 ? "mr-5" : "mx-5"
                } text-text-default font-sans font-semibold focus:outline-none`}
                onClick={() => setTab(i)}
                key={tabName}
              >
                <h2 className="mb-4 select-none">{tabName}</h2>
                {tab === i && <SelectedRectangle />}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return userLoading || !user ? (
    <div className="bg-paper min-h-screen flex flex-col">
      <LoadingSpinner />
    </div>
  ) : (
    <>
      <Head>
        <title>Heirloom | My Heirlooms</title>
      </Head>
      <div className="bg-paper min-h-screen flex flex-col">
        <DashNavbar />

        <HomeHeader />

        {/*Memorial Grid*/}
        {memorialsLoading || !memorials ? (
          <LoadingSpinner />
        ) : (
          <div className="sm:px-60 2xl:px-0 mt-12 grid sm:grid-cols-2 2xl:max-w-4xl 2xl:w-full 2xl:mx-auto md:grid-cols-3 gap-10">
            {memorials.map((memorial) => (
              <MemorialCard
                key={memorial.id}
                onOpenSettings={() => openSettings(memorial)}
                memorial={memorial}
                role={roles[memorial.id]}
              />
            ))}
          </div>
        )}
      </div>
      <HeirloomSettingsModal
        open={!!selectedMemorial}
        onClose={closeSettings}
        memorial={selectedMemorial}
      />
    </>
  );
}
