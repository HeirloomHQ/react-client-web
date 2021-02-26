import Head from "next/head";
import Navbar from "../components/navbar";
import Button from "../components/button";

export default function Home() {
  return (
    <>
      <Head>
        <title>Heirloom</title>
      </Head>
      <div>
        <Navbar />
        <div className="landing bg-paper w-full h-full">
          <div className="landing__left">
            <div className="landing__header">
              Keep memories of <br />
              loved ones alive.
            </div>
            <div className="landing__subheader">
              Connect and share stories with your community.
            </div>
            <div className="landing__header__button">
              <Button variant="filled"> Learn more</Button>
            </div>
          </div>

          <div className="landing__right">
            <img alt="couple holding hands" className="gramps" />
          </div>
        </div>
      </div>
    </>
  );
}
