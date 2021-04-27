import React, { useState } from "react";
import { useRouter } from "next/router";
import BubbleInfoModal from "./bubbleInfoModal";
import youtubeThumbnail from 'youtube-thumbnail'
import { Textfit } from 'react-textfit';

const MockMemoirBubble = ({ bubble, onClick }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState("bubbleInfo");
  const openModal = (variant) => {
    setModalOpen(true);
  };
  console.log(bubble)
  const imageURL = bubble.mediaUrl;
  var thumbnail= youtubeThumbnail(""+ imageURL);
  if (bubble) {
    thumbnail = youtubeThumbnail(""+ imageURL);//.mediaUrl);
  }
  // var thumbnail = youtubeThumbnail('https://www.youtube.com/watch?v=9bZkp7q19f0');

  var vid=false;
  if (thumbnail.default.url !== "http://img.youtube.com/vi/null/default.jpg") {
    vid = true;
  }
  var isText = false;
  if (bubble.mediaUrl === "" && bubble.text.length > 0) {
    isText = true;
  }
  return (isText ?
    <div
    className="bubbleElement "
    onClick={onClick}>
      <Textfit mode="multi"
            className="bubbleElement-text"
            onClick={onClick}
        style={{
        backgroundSize: "cover",
       border: "2px solid #FFFFF",

      }}
      >
      <div className="bubbleElement-text-content">
       {bubble.text}
      </div>
    </Textfit>
      </div> :
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
