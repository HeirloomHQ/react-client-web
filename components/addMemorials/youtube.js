import React, { useState, useRef, useMemo } from "react";
import { makeStyles } from "@material-ui/core";

import TextField from "../textField/textField";
import Button from "../button";
import TextArea from "../textField/textArea";

const useStyles = makeStyles(() => ({
  textField: {
    width: 200,
  },
}));

   
//   Needs to be an object of the variable needed with its fields

export default function YoutubePost({ onPost }) {

    const [media_url, setMediaUrl] = useState("");
    const [text, setText] = useState("");

    const Btn = ({ children }) => (
        <Button
          className="w-full font-bold"
          variant="filled"
          onClick={() => onPost({ media_url, text })}
          disabled={media_url === "" || text === ""}
        >
          {children}
        </Button>
      );

        return (
          <>
            <SettingsLabel help="Who is this heirloom memorializing?">
              Enter video link from Youtube
            </SettingsLabel>
            <TextField
              className="w-full mb-4"
              placeholder="https://"
              onChange={(e) => setMediaUrl(e.target.value)}
              value={media_url}
            />
            <TextField
              className="w-full mb-10"
              placeholder="Add a description"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <Btn>Post</Btn>;
          </>
        ); 
  
}

function SettingsLabel({ children }) {
  return <div className="text-2xl font-bold text-gray-700 mb-6 mt-8">{children}</div>;
}

function Spacer({ className, children }) {
  return <div className={`${className} px-16`}>{children}</div>;
}
