import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import PageNavbar from "../../components/pageNavbar";
import React, { useEffect, useState } from "react";
import BubbleElement, { defaultOptions } from "../../lib/react-bubble-ui";
import mockMemoirs from "../../components/mockMemoirs";
import MockMemoirBubble from "../../components/test";
import BubbleInfoModal from "../../components/bubbleInfoModal/index";
import { useApiCall } from "../../lib/clientSideAuth";
import LoadingSpinner from "../../components/loadingSpinner";
import { useMemorial } from "../../lib/memorial";
import { AddMemoirModal } from "../../components/addMemorials";
import { ChakraProvider } from "@chakra-ui/react";

function getMemoirs(array) {
  // console.log(array)
  if (array.length < 3) {
    while (array.length !== 3) {
      array.push({ backgroundImage: null });
    }
  }
  return array;
}
export default function Home() {
  const router = useRouter();
  const apiCall = useApiCall();
  const [memoirs, setMemoirs] = useState([]);

  const { memorial, setMemorial, loading, setLoading } = useMemorial();

  useEffect(() => {
    const loadMemorial = async () => {
      setLoading(true);
      try {
        const res = await apiCall(() =>
          axios.get(`/api/memorials/${router.query.memorialID}`, {
            withCredentials: true,
          })
        );
        setMemorial(res.data.memorial);
        setLoading(false);
      } catch (e) {
        console.log(e);
        router.push("/404");
      }
    };
    if (router.query.memorialID) {
      loadMemorial();
    }
  }, [apiCall, router, setLoading, setMemorial]);

  // bringing up the memoirs
  useEffect(() => {
    const loadMemoirs = async () => {
      setLoading(true);
      try {
        const res = await apiCall(() =>
          axios.get(`/api/memoir/${router.query.memorialID}/all_memoirs`, {
            withCredentials: true,
          })
        );
        setMemoirs(res.data.memoirs);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    if (router.query.memorialID) {
      loadMemoirs();
    }
  }, [apiCall, router, setLoading, setMemoirs]);

  const [modalOpen, setModalOpen] = useState(false);
  const [addMemModal, setAddMemModal] = useState(false);

  const closeModal = () => setModalOpen(false);

  const handleclick = () => setModalOpen(true);

  const onPlusClick = () => setAddMemModal(true);

  const onCloseClick = () => setAddMemModal(false);
  return (
    <>
      <Head>
        <title>
          Heirloom | {memorial?.firstName} {memorial?.lastName}
        </title>
      </Head>
      <ChakraProvider>
        <PageNavbar
          onPlusClick={onPlusClick}
          // onTextClick={() => console.log("launch text flow")}
          onTextClick={onPlusClick}
          onImageClick={() => console.log("launch image flow")}
          onYoutubeClick={() => console.log("launch youtube flow")}
          onCloseClick={onCloseClick}
        />
        <AddMemoirModal open={addMemModal} onCloseClick={onCloseClick} />
        <div className="landing bg-paper w-full min-h-screen scrollable">
          {!loading ? (
            <div className="bubble-container w-full h-full">
              <div className="bubble-container">
                <BubbleElement options={defaultOptions} className="bubbleUI">
                  {getMemoirs(memoirs).map((bubble, i) => (
                    <MockMemoirBubble
                      onClick={handleclick}
                      className="bubbleElement"
                      bubble={bubble}
                      key={i}
                    />
                  ))}
                </BubbleElement>
              </div>
              <BubbleInfoModal
                open={modalOpen}
                // key={i}
                onClose={closeModal}
              />
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </ChakraProvider>
    </>
  );
}
