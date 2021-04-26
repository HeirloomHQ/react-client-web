import React, { useState } from "react";
import { useRouter } from "next/router";
import BubbleInfoModal from "./bubbleInfoModal";
import youtubeThumbnail from 'youtube-thumbnail'

const MockMemoirBubble = ({ bubble, onClick }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState("bubbleInfo");
  const openModal = (variant) => {
    setModalOpen(true);
  };
  const imageURL = bubble.mediaUrl;
var thumbnail= youtubeThumbnail(bubble);
  if (bubble) {
    thumbnail = youtubeThumbnail(""+ bubble.mediaUrl);//.mediaUrl);
  }
  var thumbnail = youtubeThumbnail('https://www.youtube.com/watch?v=9bZkp7q19f0');

  var vid=false;
  if (thumbnail.default.url !== "http://img.youtube.com/vi/null/default.jpg") {
    vid = true;
  }
  return (
    <div
      style={{
        // backgroundImage: `url(${bubble.mediaUrl})`,
        backgroundImage: `url(${vid? thumbnail.medium.url : bubble.mediaUrl})`,

        backgroundSize: "cover",
        backgroundColor: "#FF7F59",
      }}
      className="bubbleElement "
      onClick={onClick}
    ></div>
  );
};
export default MockMemoirBubble;
