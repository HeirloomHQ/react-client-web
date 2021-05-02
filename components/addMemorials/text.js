import React, { useState, useRef, useMemo } from "react";
import { makeStyles } from "@material-ui/core";
import TextArea from "../textField/textArea";
import Button from "../button";

const useStyles = makeStyles(() => ({
  textField: {
    width: 200,
  },
}));

export default function TextPost({ onPost }) {
  const [text, setText] = useState("");

  return (
    <>
      <TextArea
        className="w-full my-10"
        placeholder="Write a story about Brad."
        rows={5}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <hr />
      <div className="py-10">
        <Button
          className="w-full font-bold"
          variant="filled"
          onClick={() => onPost({ text, media_url: "" })}
          disabled={text === ""}
        >
          Post
        </Button>
      </div>
    </>
  );
}

function SettingsLabel({ children }) {
  return <div className="text-2xl font-bold text-gray-700 mb-6 mt-8">{children}</div>;
}

function Spacer({ className, children }) {
  return <div className={`${className} px-16`}>{children}</div>;
}
