import React from "react";
import BubbleInfo from "./bubbleInfo";
import Close from "../icons/close";
import Image from "next/image";
import RightChevron from '../icons/rightchevron';
import LeftChevron from '../icons/leftchevron';
import youtubeThumbnail from 'youtube-thumbnail';
import ReactPlayer from 'react-player/youtube';
import { Textfit } from 'react-textfit';

export default function BubbleInfoModal({ open, onClose, bubble }) {
  function stopPropagation(e) {
    e.stopPropagation();
  }
  const imageURL = bubble.mediaUrl;

  var thumbnail = youtubeThumbnail("" + imageURL);
    // if (bubble) {
  //   thumbnail = youtubeThumbnail(bubble.mediaUrl);//.mediaUrl);
  // }
  // var thumbnail = youtubeThumbnail('https://www.youtube.com/watch?v=9bZkp7q19f0');

  var vid=false;
  if (thumbnail.default.url !== "http://img.youtube.com/vi/null/default.jpg") {
    vid = true;
  }


  var isText = ((bubble.mediaUrl === "" && bubble.text.length > 0) ? true : false);
  const modalText = isText ?
    (<div className="bubbleElement ">
      <Textfit
        mode="multi"
        className="bubbleElement-text"
        style={{
          backgroundSize: "cover",
          border: "2px solid #FFFFF",
        }}>
        <div className="bubbleElement-text-content-modal">
          {bubble.text}
        </div>
      </Textfit>
    </div>) : "";

  return (
    <div
      className={`z-50 ${
        !open && "opacity-0 pointer-events-none"
      } transition-opacity duration-300 fixed w-full h-full top-0 left-0 flex items-center justify-center`}
    >
      <div
        className="modal-overlay absolute w-full h-full opacity-90 placeholder-"
        style={{ background: "#FEF9F5" }}
        onClick={onClose}
      />

      <div
        className="modal-container bg-white bg-opacity-0 w-full  max-h-3xl max-w-3xl mx-auto rounded-3xl z-50 overflow-y-auto"
        onClick={stopPropagation}
      >
        <div className="modal-content py-8 text-left px-12 ">
          <div className="flex justify-between items-center pb-3 h-100 w-100">

            <div className="modal-close cursor-pointer z-50" onClick={onClose}>

              <LeftChevron />
            </div>
            {vid ?
              (<div>
                <ReactPlayer
                width="640px"
                height='600px'
                className="player"
                url={imageURL} />
              <div
                style={{
                  paddingTop:"10px",
                  height: '50px',
                  lineHeight: '22px',
                  fontSize:'18px'
                    }} >
                {bubble.text}
                test text
             </div>
             </div>

              ) : (
            <div>
              <div
                style={{
                  backgroundImage: `url(${bubble.mediaUrl})`,
                  // backgroundImage: `url(${vid? thumbnail.medium.url : bubble.mediaUrl})`,
                  backgroundSize: "cover",
                  backgroundColor: "#FF7F59",
                  height: '600px',
                  width: '600px'
                }}
              >
                {modalText}
              </div>
              <div
                style={{
                  paddingTop:"10px",
                  height: '50px',
                  lineHeight: '22px',
                  fontSize:'18px'
                }}>

                {bubble.text}
                  test text
              </div>
            </div>
              )}

            <div className="modal-close cursor-pointer z-50" onClick={onClose}>

              <RightChevron />
            </div>
          </div>
          <BubbleInfo />
        </div>
      </div>
    // </div>
  );
}
