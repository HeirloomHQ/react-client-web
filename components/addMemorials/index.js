import React, { useState, useRef, useMemo } from "react";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { RadioGroup, Stack, Radio } from "@chakra-ui/react";

import ModalBase from "./modalbase";
import TextField from "../textField/textField";
import Button from "../button";
import { useDragAndDrop } from "../createHeirloom/hooks";
import TextArea from "../textField/textArea";

import styles from "./create.module.css";
import { useApiCall } from "../../lib/clientSideAuth";
import axios from "axios";
import { useMemorial } from "../../lib/memorial";
import TextPost from "./text";
import YoutubePost from "./youtube";
import PhotoPost from "./photos";

const useStyles = makeStyles(() => ({
  textField: {
    width: 200,
  },
}));

export function AddMemoirModal({ variant, onCloseClick }) {
  const open = variant !== "";
  const { memorial } = useMemorial();
  const apiCall = useApiCall();

  const onClose = () => onCloseClick();
  const clearAndClose = () => {
    onClose();
  };

  const advanceStep = () => setStep(step + 1);
  const reverseStep = () => setStep(step - 1 >= 0 ? step - 1 : 0);

  const [createLoading, setCreateLoading] = useState(false);
  const [memData, setMemData] = useState({ story: "", video: "", link: "", photo: "" });

  const addModal = (postParams) => {
    console.log({ postParams });
    apiCall(() =>
      axios.post(`/api/memoir/${memorial.id}`, postParams, { withCredentials: true })
    )
      .then(() => {
        setCreateLoading(false);
        clearAndClose();
        //TODO: Function to reload single memorial
        console.log("Imformation has been sent");
      })
      .catch((e) => {
        setCreateLoading(false);
        window.alert(e);
      });
  };

  const Title = () => {
    switch (variant) {
      case "PHOTO":
      default:
        return "Upload Photo";
      case "TEXT":
        return "Tell a Story";
      case "YOUTUBE":
        return "Upload Video";
    }
  };

  function ModalBody({ variant }) {
    switch (variant) {
      case "TEXT":
      default:
        return <TextPost onPost={addModal} />;
      case "PHOTO":
        return <PhotoPost onPost={addModal} />;
      case "YOUTUBE":
        return <YoutubePost onPost={addModal} />;
    }
  }

  return (
    <ModalBase open={open} onClose={clearAndClose}>
      <div className="w-full flex justify-between">
        <IconButton
          size="small"
          onClick={reverseStep}
          className={open && "opacity-0 pointer-events-none"}
          style={{ marginTop: "1rem", marginLeft: "1rem", marginBottom: "auto" }}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>

        <h2 className="font-sans font-bold text-gray-700 text-4xl text-center my-10">
          <Title />
        </h2>
        <IconButton
          size="small"
          onClick={clearAndClose}
          style={{ marginTop: "1rem", marginRight: "1rem", marginBottom: "auto" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </div>
      <hr />
      <Spacer>
        <ModalBody variant={variant} />
      </Spacer>
    </ModalBase>
  );
}

function SettingsLabel({ children }) {
  return <div className="text-2xl font-bold text-gray-700 mb-6 mt-8">{children}</div>;
}

function Spacer({ className, children }) {
  return <div className={`${className} px-16`}>{children}</div>;
}
