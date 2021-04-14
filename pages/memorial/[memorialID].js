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

//reference: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function functionCall(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  if (array.length < 18) {
    while (array.length != 18) {
      array.push({ backgroundImage: null });
    }
  }
  return array;
}
export default function Home() {
  const router = useRouter();
  const apiCall = useApiCall();

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
  }, [apiCall, router]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState("bubbleInfo");
  const openModal = (variant) => {
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleclick = () => setModalOpen(true);

  return (
    <>
      <Head>
        <title>{/*{firstname} {lastname}*/}</title>
      </Head>
      <PageNavbar />
      <div>
        <div className="landing bg-paper w-full h-full">
          {!loading ? (
            <div className="bubble-container w-full h-full">
              <div className="bubble-container">
                <BubbleElement options={defaultOptions} className="bubbleUI">
                  {functionCall(mockMemoirs).map((bubble, i) => (
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
      </div>
    </>
  );
}