import React ,{ useState } from "react";
import { useRouter } from "next/router";
import BubbleInfoModal from "./bubbleInfoModal";

export default function mockMemoirBubble(props) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState("bubbleInfo");
  const openModal = (variant) => {
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  return (
    <div
      style={{
        backgroundImage: props.backgroundImage, 
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: '#FF7F59',
      }}
      className="bubbleElement"
      // onClick={() => openModal("bubbleInfo")}
      onClick={() => router.push("/home")}
    >
      <BubbleInfoModal
        open={modalOpen}
        onClose={closeModal}
        />
    </div>
  );
}
