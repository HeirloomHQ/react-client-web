import React, { useState, useRef, useMemo } from "react";
import { makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import ModalBase from "./modalbase";
import TextField from "../textField/textField";
import Button from "../button";
import { useDragAndDrop } from "../createHeirloom/hooks";
import LoadingSpinner from "../loadingSpinner";

import styles from "./create.module.css";
import { useApiCall } from "../../lib/clientSideAuth";
import axios from "axios";

const useStyles = makeStyles(() => ({
  textField: {
    width: 200,
  },
}));

export default function PhotoPost({ type, onPost }) {
  const classes = useStyles();
  const [media_url, setMediaUrl] = useState("");
  const [text, setText] = useState("");

  const { enterDropZone, leaveDropZone, inDropZone, file, setFile } = useDragAndDrop();
  const apiCall = useApiCall();

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    enterDropZone();
  };

  const [imageLoading, setImageLoading] = useState(false);
  const uploadImage = useMemo(
    () => (inFile) => {
      const data = new FormData();
      data.append("img", inFile);
      setImageLoading(true);
      apiCall(() =>
        axios.post("/api/image", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      )
        .then((res) => {
          setFile(inFile);
          setMediaUrl(res.data.imageURL)
          setImageLoading(false);
        })
        .catch((e) => {
          setImageLoading(false);
          window.alert(e);
        });
    },
    [setFile, apiCall]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];

    if (files && files.length > 0) {
      const [inFile] = files;
      uploadImage(inFile);
    }
    leaveDropZone();
  };

  const handleBrowse = (e) => {
    let files = [...e.target.files];

    if (files && files.length > 0) {
      const [inFile] = files;
      uploadImage(inFile);
    }
  };

  const Btn = ({ onClick, children, disabled }) => (
    <Button
      className="w-full font-bold mb-8"
      variant="filled"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );

  const [coverPhotoHovered, setCoverPhotoHovered] = useState(false);

  return (
          <>
      {type !== "default" ? <SettingsLabel>Add photos, videos, or audio clips</SettingsLabel> : null}
            {!file ? (
              !imageLoading ? (
                <div
                  className={`${
                    inDropZone ? styles.dndAreaLoading : styles.dndArea
                  } flex flex-col`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                >
                  <img
                    className="mx-auto mt-10 mb-5"
                    src="/assets/img/media.png"
                    alt="Heirloom logo"
                  />
                  <div className="font-sans text-gray-500 font-bold text-xl text-center mt-5  mb-10">
                    Drop your files here,
                    <br />
                    or
                    <br />
                    <label
                      className="text-heirloomOrange hover:text-heirloomOrange-dark font-bold text-xl cursor-pointer"
                      htmlFor="cover-photo-browse-in"
                    >
                      Browse
                    </label>
                    <input
                      type="file"
                      onChange={handleBrowse}
                      className="hidden"
                      id="cover-photo-browse-in"
                    />
                  </div>
                </div>
              ) : (
                <div className="h-80">
                  <LoadingSpinner />
                </div>
              )
            ) : (
              <>
                <div
                  className={`${styles.dndAreaWithPhoto} w-full bg-cover rounded-xl h-80 bg-center flex justify-end`}
                  onMouseEnter={() => setCoverPhotoHovered(true)}
                  onMouseLeave={() => setCoverPhotoHovered(false)}
                  style={{ backgroundImage: `url(${media_url})` }}
                >

                <button
                    className={[
                      coverPhotoHovered ? "" : "opacity-0 ",
                      "rounded-full mr-2 mt-2 px-2 py-2 mb-auto bg-black bg-opacity-40 text-white hover:bg-opacity-70 transition-all duration-150 focus:outline-none",
                    ].join(" ")}
                    onClick={(e) => {
                      setFile();
                      setMediaUrl("");
                      e.stopPropagation();
                    }}
                  >
                    <CloseIcon className="float-left mx-auto my-auto" fontSize="small" />
                  </button>
                </div>
                <TextField placeholder={"Add a description"} value={text} onChange={(e) => setText(e.target.value)} />
              </>
            )}
            <div className="mb-8" />
              {type !== "default" ?
                <Btn onClick={() => onPost({ text, media_url })} disabled={media_url === "" || text === ""}>Post</Btn>
                : <></>
              }
          </>
        );
  }


function SettingsLabel({ children }) {
  return <div className="text-2xl font-bold text-gray-700 mb-6 mt-8">{children}</div>;
}

function Spacer({ className, children }) {
  return <div className={`${className} px-16`}>{children}</div>;
}
