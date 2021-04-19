import Head from "next/head";
import Navbar from "../components/navbar";
import Button from "../components/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SignupLoginModal from "../components/signupLoginModal";

export default function Home() {
  const router = useRouter();
  const { signup } = router.query;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState("signIn");
  const openModal = (variant) => {
    setModalVariant(variant);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (!!signup) {
      openModal("signUp");
    }
  }, [signup]);

  return (
    <>
      <Head>
        <title>Heirloom</title>
      </Head>
      <div>
        <Navbar openModal={openModal} />
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
      <SignupLoginModal
        open={modalOpen}
        onClose={closeModal}
        variant={modalVariant}
        toggleVariant={() =>
          setModalVariant(modalVariant === "signIn" ? "signUp" : "signIn")
        }
      />
    </>
  );
}
