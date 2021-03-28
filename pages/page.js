import Head from "next/head";
import { useRouter } from "next/router";
import PageNavbar from "../components/pageNavbar";
import React from "react";
import BubbleElement, { defaultOptions } from "../lib/react-bubble-ui";
import mockMemoirs from "../components/mockMemoirs";
import MockMemoirBubble from "../components/test";
import BubbleInfoModal from "../components/bubbleInfoModal/index";


//reference: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function functionCall(array){
  var currentIndex = array.length, temporaryValue, randomIndex;

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
  if (array.length < 18){
    while (array.length != 18){
      array.push({backgroundImage: null})
    }
  }
  return array

}
export default function Home() {
	const router = useRouter();
	console.log(router.query.mem_id);
	const memorial_id = router.query.mem_id
	const firstname = router.query?.firstname
  const lastname = router.query?.lastname

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
        <title>{firstname} {lastname}</title>
      </Head>
	  <PageNavbar />
      <div>
        <div className="landing bg-paper w-full h-full">
		      <div className="bubble-container w-full h-full">
            <BubbleElement options={defaultOptions}  className="bubbleUI w-full h-full" >
              {functionCall(mockMemoirs).map((bubble, i) => (
                <div>
                  <MockMemoirBubble onClick={handleclick} className="bubbleElement w-full h-screen"
                  bubble={bubble} key={i} />

                  <BubbleInfoModal
                    open={modalOpen}
                    key={i}
                  onClose={closeModal}
                  />
                </div>

				))}
            </BubbleElement>

          </div>
        </div>
      </div>
    </>
  );
}