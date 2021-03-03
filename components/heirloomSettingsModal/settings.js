import React, { useState } from "react";
import Image from "next/image";

import Button from "../button";
import ButtonFileInput from "../buttonFileInput";
import TextArea from "../textField/textArea";
import TextField from "../textField/textField";
import ExampleMemorialCard from "./exampleMemorialCard";
import SettingLabel from "./settingsLabel";

export default function HeirloomSettings() {
  const [theme, setTheme] = useState(COLORS[0]);

  const pageDescriptionHelp = (
    <div className="flex flex-col items-center">
      This short description will appear below the name of the person being memorialized.
      <ExampleMemorialCard outlined="photo" />
    </div>
  );

  const coverPhotoHelp = (
    <div className="flex flex-col items-center">
      This short description will appear below the name of the person being memorialized.
      <ExampleMemorialCard outlined="description" />
    </div>
  );

  return (
    <div>
      <SettingLabel help="Who is this heirloom memorializing?">Name</SettingLabel>
      <TextField id="heirloom-f-name" className="w-full mb-10" placeholder="First Last" />
      <hr />

      <SettingLabel help={pageDescriptionHelp}>Page Description</SettingLabel>
      <TextField
        id="heirloom-f-name"
        className="w-full mb-10"
        placeholder="In loving memory"
        maxCharacters={100}
      />
      <hr />

      <SettingLabel help={coverPhotoHelp}>Cover Photo</SettingLabel>
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

      <SettingLabel help="Write a description of the person being memorialized’s life. When and where did they grow up? Who and what filled the pages of their life journey?">
        Bio (optional)
      </SettingLabel>
      <TextArea
        id="heirloom-f-name"
        className="w-full mb-10"
        placeholder="Who are you memorializing? What filled the pages of their life story?"
        multiline
        rows={6}
        maxCharacters={2000}
      />
      <hr />

      <SettingLabel help="Customize your Heirloom page. The color you choose will change the color of the buttons on the Heirloom page itself.">
        Page Theme
      </SettingLabel>
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

      <SettingLabel help="Save an offline copy of your Heirloom to your computer. ">
        Offline Export
      </SettingLabel>
      <Button className="mr-4 mb-10">Export as PDF</Button>
      <Button>Export as Webpage</Button>

      <hr />
      <SettingLabel help="Deleting your page will remove the page from the internet, and all its content will be deleted forever. Before deleting an Heirloom, we recommend exporting a copy of it first. To hide your Heirloom from the public, take it offline. We’ll save a copy of your page if you ever want to make it visible again. ">
        Delete Heirloom
      </SettingLabel>
      <Button className="mr-4 mb-10">
        <span className="text-red-500">Delete Heirloom</span>
      </Button>
      <Button>Take Online</Button>
    </div>
  );
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
