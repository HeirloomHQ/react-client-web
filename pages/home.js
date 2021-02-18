import { useState } from "react";
import Head from "next/head";
import Button from "../components/button";
import styles from "../styles/home.module.css";
import DashNavbar from "../components/dashNavbar";
import { isAuthenticated, redirectHome } from "../lib/serverSideAuth";

export async function getServerSideProps(ctx) {
  const isAuth = await isAuthenticated(ctx);
  if (!isAuth) return redirectHome(ctx);
  return {
    props: {},
  };
}

export default function Home() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Head>
        <title>Heirloom | My Heirlooms</title>
      </Head>
      <div className="bg-paper min-h-screen">
        <DashNavbar />

        {/*Dash header*/}
        <div className="flex flex-col sm:px-60 2xl:px-0 pt-14 w-full bg-paper shadow-lg">
          <div className="2xl:max-w-4xl 2xl:w-full 2xl:mx-auto">
            <div className="flex justify-between">
              <h1 className="text-3xl font-sans font-extrabold text-text-default">
                My Heirlooms
              </h1>
              <Button variant="filled">+&nbsp;&nbsp;&nbsp;Create an Heirloom</Button>
            </div>
            <div className="mt-8 flex flex-start">
              <div
                className="mr-5 text-text-default font-sans font-semibold"
                onClick={() => setTab(0)}
              >
                <h2 className="mb-4 select-none">Home</h2>
                {tab === 0 && <SelectedRectangle />}
              </div>
              <div
                className="mx-5 text-text-default font-sans font-semibold"
                onClick={() => setTab(1)}
              >
                <h2 className="mb-4 select-none">Invites</h2>
                {tab === 1 && <SelectedRectangle />}
              </div>
              <div
                className="mx-5 text-text-default font-sans font-semibold"
                onClick={() => setTab(2)}
              >
                <h2 className="mb-4 select-none">Notifications</h2>
                {tab === 2 && <SelectedRectangle />}
              </div>
            </div>
          </div>
        </div>

        {/*Memorial Grid*/}
        <div className="sm:px-60 2xl:px-0 mt-12 grid sm:grid-cols-2 2xl:max-w-4xl 2xl:w-full 2xl:mx-auto md:grid-cols-3  gap-12">
          <MockMemorialCard />
          <MockMemorialCard />
          <MockMemorialCard />
          <MockMemorialCard />
          <MockMemorialCard />
          <MockMemorialCard />
        </div>
      </div>
    </>
  );
}

// fake card while card is in dev
function MockMemorialCard({ onClick }) {
  return (
    <div
      className="h-72 mb-8 rounded-2xl border-black border-2"
      onClick={() => onClick("fake-id")}
    >
      {" "}
    </div>
  );
}
