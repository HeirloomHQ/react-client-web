import React, { useState } from "react";
import { useRouter } from "next/router";
import BubbleInfoModal from "./bubbleInfoModal";

const MockMemoirBubble = ({ bubble, onClick }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState("bubbleInfo");
  const openModal = (variant) => {
    setModalOpen(true);
  };
  const imageURL = bubble.mediaUrl;

  return (
    <div
      style={{
        backgroundImage: `url(${bubble.mediaUrl})`,
        backgroundSize: "cover",
        backgroundColor: "#FFFFFF",
      }}
      className="bubbleElement "
      onClick={onClick}
    ></div>
  );
};
export default MockMemoirBubble;
