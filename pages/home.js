import { useState } from "react";
import Head from "next/head";
import Navbar from "../components/navbar";
import Button from "../components/button";
import styles from "../styles/home.module.css";

export default function Home() {
  const [tab, setTab] = useState(0);
  return (
    <>
      <Head>
        <title>Heirloom | My Heirlooms</title>
      </Head>
      <div className="bg-paper min-h-screen">
        <Navbar />
        <div className="flex flex-col px-48 pt-10 w-full bg-paper shadow-lg">
          <div className="flex justify-between">
            <h1 className="text-3xl font-sans text-text-default">My Heirlooms</h1>
            <Button variant="outlined">+&nbsp;&nbsp;&nbsp;Create new Heirloom</Button>
          </div>
          <div className="mt-8 flex flex-start">
            <div className="mr-5 text-text-default font-sans" onClick={() => setTab(0)}>
              <h2 className="mb-4 select-none">Home</h2>
              {tab === 0 && <SelectedRectangle />}
            </div>
            <div className="mx-5 text-text-default font-sans" onClick={() => setTab(1)}>
              <h2 className="mb-4 select-none">Invites</h2>
              {tab === 1 && <SelectedRectangle />}
            </div>
            <div className="mx-5 text-text-default font-sans" onClick={() => setTab(2)}>
              <h2 className="mb-4 select-none">Notifications</h2>
              {tab === 2 && <SelectedRectangle />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SelectedRectangle() {
  return <div className={styles.rectangle} />;
}
