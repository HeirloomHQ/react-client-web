import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import Navbar from "../components/navbar";
import Button from "../components/button";

export default function Home() {
  const [message, setMessage] = useState("initial state");
  async function onButtonClick() {
    try {
      const response = await axios.get("/api");
      const { data } = response;
      setMessage(data.message);
    } catch (e) {
      window.alert(e);
    }
  }

  return (
    <>
      <Head>
        <title>Heirloom</title>
      </Head>
      <Navbar />
      <button onClick={onButtonClick}>mybutton</button>
      <p>{message}</p>
      <div className="landing">
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
    </>
  );
}
