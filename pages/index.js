import Head from "next/head";
import Navbar from "../components/navbar";
import Landing from "./Landing/Landing";

export default function Home() {
  return (
    <>
      <Head>
        <title>Heirloom</title>
      </Head>
      <Navbar />
      <Landing />
    </>
  );
}
