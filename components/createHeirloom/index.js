import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { RadioGroup, Stack, Radio } from "@chakra-ui/react";
import Image from "next/image";

import ModalBase from "./modalbase";
import TextField from "../textField/textField";
import ChipTextField from "../textField/chipTextField";
import Button from "../button";
import { useHeirloomCreatContext } from "./hooks";
import TextArea from "../textField/textArea";

import styles from "./create.module.css";

const useStyles = makeStyles(() => ({
  textField: {
    width: 200,
  },
}));

export function CreateHeirloomModal() {
  const [, dispatch] = useHeirloomCreatContext();

  const onClose = () => dispatch({ type: "CLOSE" });

  const [step, setStep] = useState(0);
  const advanceStep = () => setStep(step + 1);
  const reverseStep = () => setStep(step - 1 >= 0 ? step - 1 : 0);

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
    const Btn = ({ onClick, children }) => (
      <Button className="w-full font-bold" variant="filled" onClick={onClick}>
        {children}
      </Button>
    );
    switch (step) {
      case 0:
      case 1:
      case 2:
      default:
        return <Btn onClick={advanceStep}>Next</Btn>;
      case 3:
        return (
          <>
            <Btn onClick={advanceStep}>Send Invite</Btn>
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
            <Btn>Create Heirloom</Btn>{" "}
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
  switch (step) {
    case 0:
    default:
      return (
        <>
          <SettingsLabel help="Who is this heirloom memorializing?">
            Who are you honoring with this Heirloom?
          </SettingsLabel>
          <TextField
            id="heirloom-f-name"
            className="w-full mb-10"
            placeholder="First Last"
            name="firstName"
          />
          <hr />

          <SettingsLabel>Date of Birth</SettingsLabel>
          <div className="w-full mb-10 flex">
            <TextField
              id="date"
              label="Birthday"
              type="date"
              className={`${classes.textField} text-gray-500`}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <span className="font-bold text-5xl font-display mx-5 text-gray-500">-</span>
            <TextField
              id="date"
              label="Birthday"
              type="date"
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
            name="firstName"
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
            <RadioGroup defaultValue="">
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
          <ChipTextField id="invite-people-input" className="mb-10" />
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
          <div className={`${styles.dndArea} flex flex-col`}>
            <img
              className="mx-auto mt-10 mb-5"
              src="/assets/img/media.png"
              alt="Heirloom logo"
            />
            <div className="font-sans text-gray-500 font-bold text-xl text-center mt-5 mb-10">
              Drop your files here,
              <br /> or{" "}
              <button className="text-heirloomOrange font-bold text-xl focus:outline-none focus:ring-0">
                Browse
              </button>
            </div>
          </div>
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
