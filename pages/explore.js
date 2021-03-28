import React ,{ useState } from "react";
import BubbleElement, { defaultOptions } from "../lib/react-bubble-ui";
import companyData from "../components/companies";
import CompanyBubble from "../components/test";
import Head from "next/head";
import BubbleInfoModal from "../components/bubbleInfoModal/index";


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
        <BubbleElement  options={defaultOptions} className="bubbleUI">
          {companyData.slice(0, 20).map((company, i) => (
            <div>
              <CompanyBubble onClick={handleclick} {...company} key={i} />


            </div>
          ))}
        </BubbleElement>
        <BubbleInfoModal
                    open={modalOpen}
                  onClose={closeModal}
                  />
      </div>
    </>
  );
}
