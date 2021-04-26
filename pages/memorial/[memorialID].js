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
import youtubeThumbnail from 'youtube-thumbnail'

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
  const [modalVariant, setModalVariant] = useState("");
  const [modalKey, setModalKey] = useState("");

  const closeModal = () => setModalOpen(false);

  const handleclick = (i) => {
    setModalKey(i);
    setModalOpen(true);
  };
  const onCloseClick = () => setModalVariant("");
  const getThubmnail = (bubble) => {
    var thumbnail = youtubeThumbnail(bubble.mediaUrl);
    console.log(bubble)
    if (bubble) {
      thumbnail = youtubeThumbnail(bubble.mediaUrl);//.mediaUrl);
    }
    return thumbnail.medium.url;
  }
  return (
    <>
      <Head>
        <title>
          Heirloom | {memorial?.firstName} {memorial?.lastName}
        </title>
      </Head>


      <ChakraProvider class="background-p">
        <PageNavbar
          // onPlusClick={onPlusClick}
          onTextClick={
            // set stat
            () => setModalVariant("TEXT")}
          // onTextClick={onTextClick}
          onImageClick={
            () => setModalVariant("PHOTO")}
          onYoutubeClick={
            () => setModalVariant("YOUTUBE")}

        />
        <AddMemoirModal onCloseClick={onCloseClick} variant={modalVariant} />

        <div className="landing bg-paper w-full min-h-screen scrollable backdrop-filter backdrop-blur-lg">

          {!loading ? (

            <div className="bubble-container w-full h-130">
              <div className="bubble-container-add">
                <BubbleElement options={defaultOptions} className="bubbleUI">
                  {getMemoirs(memoirs).map((bubble, i) => (
                    <MockMemoirBubble
                      onClick={()=>handleclick(bubble)}
                      className="bubbleElement"
                      bubble={(bubble)}
                      key={i}
                    />
                  ))}
                </BubbleElement>
              </div>
                <BubbleInfoModal
                  open={modalOpen}
                  bubble={modalKey}
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
