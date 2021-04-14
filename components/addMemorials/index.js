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

const useStyles = makeStyles(() => ({
  textField: {
    width: 200,
  },
}));

export function AddMemoirModal({open,onCloseClick}) {
//   const [{ createState, emails }, dispatch] = useHeirloomCreatContext();
  const { memorial } = useMemorial();
  const apiCall = useApiCall();
  console.log("Meme",memorial)

 const onClose = () =>  onCloseClick() 
  const clearAndClose = () => {
    setStep(0)
    onClose(); 
  };

  const [step, setStep] = useState(0);
  const advanceStep = () => setStep(step + 1);
  const reverseStep = () => setStep(step - 1 >= 0 ? step - 1 : 0);

  const [createLoading, setCreateLoading] = useState(false);

const addModal = () => {
  apiCall(() => axios.post(`/api/memoir/${memorial.id}`, memData, { withCredentials: true }))
    .then(() => {
      setCreateLoading(false);
      clearAndClose();
      //TODO: Function to reload single memorial
      console.log("Imformation has been sent")
    })
    .catch((e) => {
      setCreateLoading(false);
      window.alert(e);
    });
};

  const Title = () => {
    switch (step) {
     default:
      case 0:
      
        return "Upload Photo";
      case 1:
        return "Tell a Story";
      case 2:
          return "Upload Video "
      
    }
  };

  const ActionButton = () => {
    const Btn = ({ onClick, children, disabled }) => (
      <Button
        className="w-full font-bold"
        variant="filled"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
    );
    switch (step) {
    default:
      case 0:
        return (
          <Btn
            onClick={advanceStep}
            // disabled={
            //   createState.firstName === "" ||
            //   createState.lastName === "" ||
            //   createState.born === "" ||
            //   createState.died === ""
            // }
          >
            Next
          </Btn>
        );
      case 1:
        return (
          <Btn onClick={advanceStep}
        //    disabled={createState.description === ""}
           >
            Next
          </Btn>
        );
      case 2:
      
        return <Btn onClick={onCloseClick}>Post</Btn>;
        // Create an apiCall that calls the hook apiCall
        // Look for backend implementation
          //  Pass memData to a post request
            // Do in some button
  
    }
  };

  return (
    <ModalBase open= {open} onClose={clearAndClose}>
      <div className="w-full flex justify-between">
        <IconButton
          size="small"
          onClick={reverseStep}
          className={step > 0 ? "" : "opacity-0 pointer-events-none"}
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
        <FormSteps step={step} />
        <hr />
        <div className="py-10">
          <ActionButton />
        </div>
      </Spacer>
    </ModalBase>
  );
}

function FormSteps({ step }) {
  const classes = useStyles();
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
  const [memData, setMemData] = useState({story:"",video:"",link:"", photo:""});

  const uploadImage = useMemo(
    () => (inFile) => {
      const data = new FormData();
      data.append("img", inFile);

      apiCall(() =>
        axios.post("/api/image", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      )
        .then((res) => {
          setFile(inFile);
          setMemData({...memData, photo: res.data.imageURL })
        })
        .catch((e) => window.alert(e));
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

//   Needs to be an object of the variable needed with its fields

  const handleChange = (name) => (e) => {
    setMemData({...memData, [name]: e.target.value })
  };

  switch (step) {
    default:
    case 0:
    
        return (
            <>
              <SettingsLabel>Add photos, videos, or audio clips</SettingsLabel>
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
                  <br /> or{" "}
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
              {file ? (
                <div className="font-sans text-heirloomOrange mb-1">
                  {file.name}
                  <span>
                    &nbsp;
                    <IconButton
                      size="small"
                      onClick={() => {
                        setFile();
                        // dispatch({ type: "SET", name: "coverPhoto", value: "" });
                        setMemData({...memData, photo: "" })
    
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </span>
                </div>
              ) : (
                <div className="mb-12" />
              )}
            </>
          );
    case 1:
      return (
        <>
          <SettingsLabel help="Who is this heirloom memorializing?">
            {/* Tell A Story */}
          </SettingsLabel>
          <TextArea
            className="w-full mb-10"
            placeholder="Write a story about Brad."
            // Need to put actual name of person here
            rows={5}
            onChange={handleChange("story")}
            value={memData.story}

          />
        </>
      );

      case 2:
        return (
          <>
            <SettingsLabel help="Who is this heirloom memorializing?">
              Enter video link from Youtube
            </SettingsLabel>
            <TextArea
              className="w-full mb-10"
              placeholder="https://:"
              // Need to put actual name of person here
              rows={5}
              onChange={handleChange("video")}
              value={memData.video}
            />
          </>
        ); 
  }
}

function SettingsLabel({ children }) {
  return <div className="text-2xl font-bold text-gray-700 mb-6 mt-8">{children}</div>;
}

function Spacer({ className, children }) {
  return <div className={`${className} px-16`}>{children}</div>;
}
