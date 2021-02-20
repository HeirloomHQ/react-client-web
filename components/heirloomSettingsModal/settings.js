import React, { useState } from "react";
import Image from "next/image";

import Button from "../button";
import ButtonFileInput from "../buttonFileInput";
import TextArea from "../textField/textArea";
import TextField from "../textField/textField";

export default function HeirloomSettings() {
  const [theme, setTheme] = useState(COLORS[0]);

  return (
    <div>
      <SettingLabel>Name</SettingLabel>
      <TextField id="heirloom-f-name" className="w-full mb-10" placeholder="First Last" />
      <hr />

      <SettingLabel>Page Description</SettingLabel>
      <TextField
        id="heirloom-f-name"
        className="w-full mb-10"
        placeholder="In loving memory"
        maxCharacters={100}
      />
      <hr />

      <SettingLabel>Cover Photo</SettingLabel>
      <div className="mb-4">
        <Image src="/assets/img/default_cover_photo.png" width={237} height={150} />
      </div>
      <ButtonFileInput
        id="heriloom-cover-photo-usr"
        className="mb-10"
        type="file"
        onChange={(e) => console.log(e)}
      >
        Upload a Photo
      </ButtonFileInput>
      <hr />

      <SettingLabel>Bio (optional)</SettingLabel>
      <TextArea
        id="heirloom-f-name"
        className="w-full mb-10"
        placeholder="Who are you memorializing? What filled the pages of their life story?"
        multiline
        rows={6}
        maxCharacters={2000}
      />
      <hr />

      <SettingLabel>Page Theme</SettingLabel>
      <div className="flex mb-10">
        {COLORS.map((fill, i) => (
          <ColorPicker
            className={i === 0 ? "mr-1" : "mx-1"}
            selected={theme === fill}
            key={fill}
            fill={fill}
            onClick={() => setTheme(fill)}
          />
        ))}
      </div>
      <hr />

      <SettingLabel>Offline Export</SettingLabel>
      <Button className="mr-4 mb-10">Export as PDF</Button>
      <Button>Export as Webpage</Button>

      <hr />
      <SettingLabel>Delete Heirloom</SettingLabel>
      <Button className="mr-4 mb-10">
        <span className="text-red-500">Delete Heirloom</span>
      </Button>
      <Button>Take Online</Button>
    </div>
  );
}

function SettingLabel({ children }) {
  return <div className="text-xl font-bold mb-4 mt-8">{children}</div>;
}

const COLORS = [
  "#FF7F59",
  "#EE4848",
  "#EE48A1",
  "#EB89CA",
  "#C070F1",
  "#8366F6",
  "#283FB9",
  "#3074F7",
  "#66BAF6",
  "#07D1B9",
  "#10B151",
  "#7EB66B",
  "#F1BE3B",
  "#BCA945",
];

function ColorPicker({ fill, selected, ...rest }) {
  return (
    <div {...rest}>
      <svg height="48" width="48">
        {selected && <circle cx="24" cy="24" r="23" stroke="gray" fill="white" />}
        <circle cx="24" cy="24" r="20" fill={fill} />
      </svg>
    </div>
  );
}
