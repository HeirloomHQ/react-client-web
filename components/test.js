import React ,{ useState } from "react";
import { useRouter } from "next/router";
import BubbleInfoModal from "./bubbleInfoModal";

const mockMemoirBubble=({bubble,onClick})=> {
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
        backgroundImage: bubble.backgroundImage,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: '#FF7F59',
      }}
      className="bubbleElement "
      onClick={onClick}
    >



    </div>
  );
}
export default mockMemoirBubble;