import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../components/navbar";
import Button from "../components/button";
import PageNavbar from "../components/pageNavbar";

export default function Home() {
	const router = useRouter();
	console.log(router.query.mem_id);
	const memorial_id = router.query.mem_id
  return (
    <>
      <Head>
        <title>Heirloom</title>
      </Head>
	  <PageNavbar />
      <div>
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