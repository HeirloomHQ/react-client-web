import React, { useState, useRef, useMemo } from "react";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { RadioGroup, Stack, Radio } from "@chakra-ui/react";

import ModalBase from "./modalbase";
import TextField from "../textField/textField";
import Button from "../button";
import { useDragAndDrop, useHeirloomCreatContext } from "./hooks";
import TextArea from "../textField/textArea";

import styles from "./create.module.css";
import EmailChipTextField from "./emailChipTextField";
import { useApiCall } from "../../lib/clientSideAuth";
import axios from "axios";
import { useMemorial } from "../../lib/memorial";

const useStyles = makeStyles(() => ({
  textField: {
    width: 200,
  },
}));

export function CreateHeirloomModal() {
  const [{ createState, emails }, dispatch] = useHeirloomCreatContext();
  const { reloadMemorials } = useMemorial();
  const apiCall = useApiCall();

  const onClose = () => dispatch({ type: "CLOSE" });
  const clearAndClose = () => {
    dispatch({ type: "RESET" });
    onClose();
  };

  const [step, setStep] = useState(0);
  const advanceStep = () => setStep(step + 1);
  const reverseStep = () => setStep(step - 1 >= 0 ? step - 1 : 0);

  const [createLoading, setCreateLoading] = useState(false);
  const createHeirloom = () => {
    apiCall(() => axios.post("/api/memorials", createState, { withCredentials: true }))
      .then(() => {
        setCreateLoading(false);
        clearAndClose();
        reloadMemorials();
      })
      .catch((e) => {
        setCreateLoading(false);
        window.alert(e);
      });
  };

  const Title = () => {
    switch (step) {
      case 0:
      case 1:
      case 2:
      default:
        return "Create New Heirloom";
      case 3:
        return "Invite Contributors";
      case 4:
        return "Add a Cover Photo";
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
      case 0:
        return (
          <Btn
            onClick={advanceStep}
            disabled={
              createState.firstName === "" ||
              createState.lastName === "" ||
              createState.born === "" ||
              createState.died === ""
            }
          >
            Next
          </Btn>
        );
      case 1:
        return (
          <Btn onClick={advanceStep} disabled={createState.description === ""}>
            Next
          </Btn>
        );
      case 2:
      default:
        return <Btn onClick={advanceStep}>Next</Btn>;
      case 3:
        return (
          <>
            <Btn onClick={advanceStep} disabled={emails.length === 0}>
              Send Invite
            </Btn>
            <div className="mt-4 w-full flex justify-center">
              <button
                className="font-sans font-bold text-center text-heirloomOrange"
                onClick={advanceStep}
              >
                Skip
              </button>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <Btn disabled={createLoading} onClick={createHeirloom}>
              Create Heirloom
            </Btn>
            <div className="mt-4 w-full flex justify-center">
              <button className="font-sans font-bold text-center text-heirloomOrange">
                Add later
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <ModalBase>
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
          onClick={onClose}
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
  const [{ emails, createState }, dispatch] = useHeirloomCreatContext();
  const { firstName, lastName, born, died, description } = createState;
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
          dispatch({ type: "SET", name: "coverPhoto", value: res.data.imageURL });
        })
        .catch((e) => window.alert(e));
    },
    [setFile, apiCall, dispatch]
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

  const handleChange = (name) => (e) => {
    const toDispatch = { type: "SET", name, value: e.target.value };
    dispatch(toDispatch);
  };

  switch (step) {
    case 0:
    default:
      return (
        <>
          <SettingsLabel help="Who is this heirloom memorializing?">
            Who are you honoring with this Heirloom?
          </SettingsLabel>
          <div className="w-full mb-10 flex">
            <TextField
              id="heirloom-f-name"
              className="w-full pr-2"
              placeholder="First"
              name="firstName"
              onChange={handleChange("firstName")}
              value={firstName}
            />
            <TextField
              id="heirloom-f-name"
              className="w-full pl-2"
              placeholder="Last"
              name="lastName"
              onChange={handleChange("lastName")}
              value={lastName}
            />
          </div>
          <hr />

          <SettingsLabel>Date of Birth</SettingsLabel>
          <div className="w-full mb-10 flex">
            <TextField
              type="date"
              name="born"
              className={`${classes.textField} text-gray-500`}
              onChange={handleChange("born")}
              value={born}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <span className="font-bold text-5xl font-display mx-5 text-gray-500">-</span>
            <TextField
              type="date"
              name="died"
              onChange={handleChange("died")}
              value={died}
              className={`${classes.textField} text-gray-500`}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </>
      );
    case 1:
      return (
        <>
          <SettingsLabel help="Who is this heirloom memorializing?">
            Write an introduction
          </SettingsLabel>
          <TextArea
            className="w-full mb-10"
            placeholder="This Heirloom was created to help collect our memories of Brad in a single place online."
            rows={5}
            onChange={handleChange("description")}
            value={description}
          />
        </>
      );
    case 2:
      return (
        <>
          <SettingsLabel help="Who is this heirloom memorializing?">
            Who can view this Heirloom?
          </SettingsLabel>
          <div className="mb-10">
            <RadioGroup defaultValue="1">
              <Stack>
                <Radio value="1" colorScheme="orange">
                  Anyone (public)
                </Radio>
                <Radio value="2" colorScheme="orange">
                  Anyone with shareable link
                </Radio>
                <Radio value="3" colorScheme="orange">
                  Only people invited to this Heirloom page
                </Radio>
              </Stack>
            </RadioGroup>
          </div>
          <hr />

          <SettingsLabel help="Who is this heirloom memorializing?">
            Who can add memories to this Heirloom?
          </SettingsLabel>
          <div className="mb-10">
            <RadioGroup defaultValue="1" co>
              <Stack>
                <Radio value="1" colorScheme="orange">
                  Anyone (public)
                </Radio>
                <Radio value="2" colorScheme="orange">
                  Anyone with the shareable link
                </Radio>
                <Radio value="3" colorScheme="orange">
                  Only people invited to this Heirloom page
                </Radio>
                <Radio value="4" colorScheme="orange">
                  Only me
                </Radio>
              </Stack>
            </RadioGroup>
          </div>
        </>
      );
    case 3:
      return (
        <>
          <SettingsLabel>Invite by Email</SettingsLabel>
          <EmailChipTextField
            emails={emails}
            onAddEmail={(email) => dispatch({ type: "ADD_EMAIL", value: email })}
            onDeleteEmail={(email) => dispatch({ type: "DELETE_EMAIL", value: email })}
          />
          <SettingsLabel>Customize Message</SettingsLabel>
          <TextArea
            className="w-full mb-10"
            placeholder="This Heirloom was created to help collect our memories of Brad in a single place online."
            rows={5}
            name="bio"
          />
        </>
      );
    case 4:
      return (
        <>
          <SettingsLabel>Upload Media</SettingsLabel>
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
                    dispatch({ type: "SET", name: "coverPhoto", value: "" });
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
  }
}

function SettingsLabel({ children }) {
  return <div className="text-2xl font-bold text-gray-700 mb-6 mt-8">{children}</div>;
}

function Spacer({ className, children }) {
  return <div className={`${className} px-16`}>{children}</div>;
}
