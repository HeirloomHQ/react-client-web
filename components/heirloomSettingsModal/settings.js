import React from "react";
import TextField from "../textField";

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
      <hr />
      <SettingLabel>Bio (optional)</SettingLabel>
      <hr />
      <SettingLabel>Page Theme</SettingLabel>
      <hr />
      <SettingLabel>Offline Export</SettingLabel>
      <hr />
      <SettingLabel>Delete Heirloom</SettingLabel>
      <hr />
    </div>
  );
}

function SettingLabel({ children }) {
  return <div className="text-xl font-bold mb-4 mt-8">{children}</div>;
}
