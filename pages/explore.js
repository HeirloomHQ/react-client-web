import React ,{ useState } from "react";
import BubbleElement, { defaultOptions } from "../lib/react-bubble-ui";
import companyData from "../components/companies";
import CompanyBubble from "../components/test";
import Head from "next/head";
import mockMemoirs from "../components/mockMemoirs";
import MockMemoirBubble from "../components/test";


import BubbleInfoModal from "../components/bubbleInfoModal/index";
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

export default function Explore() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState("bubbleInfo");
  const openModal = (variant) => {
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);


  const handleclick = () => {
    setModalOpen(true)
    console.log('cmon')
  }
  console.log("cmon")
  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>
      <div className="bubble-container">
        {/* <BubbleElement  options={defaultOptions} className="bubbleUI">
          {companyData.slice(0, 20).map((company, i) => (
            <div>
              <CompanyBubble  onClick={handleclick} {...company} key={i} />


            </div>
          ))}
        </BubbleElement>
        <BubbleInfoModal
                    open={modalOpen}
                  onClose={closeModal}
                  /> */}
        <BubbleElement options={defaultOptions}  className="bubbleUI w-full h-full" >
              {functionCall(mockMemoirs).map((bubble, i) => (
                <div>
                  <MockMemoirBubble onClick={handleclick} className="bubbleElement w-full h-screen"
                  bubble={bubble} key={i} />


                </div>

				))}
        </BubbleElement>
        <BubbleInfoModal
                    open={modalOpen}
                    // key={i}
                  onClose={closeModal}
                  />
      </div>
    </>
  );
}
