import React from "react";
import Image from "next/image";
import TextField from "../textField";
import Button from "../button";
import ButtonFileInput from "../buttonFileInput";

export default function HeirloomSettings() {
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
      <TextField
        id="heirloom-f-name"
        className="w-full mb-10"
        placeholder="Who are you memorializing? What filled the pages of their life story?"
        multiline
        rows={12}
      />
      <hr />
      <SettingLabel>Page Theme</SettingLabel>
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
      <hr />
    </div>
  );
}

function SettingLabel({ children }) {
  return <div className="text-xl font-bold mb-4 mt-8">{children}</div>;
}
