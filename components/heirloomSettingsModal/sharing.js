import React, { useState } from "react";
import Button from "../button";
import Dropdown, { DropdownItem } from "../dropdown";
import Link from "../icons/link";
import Lock from "../icons/lock";
import { useMembers } from "../../lib/members";
import LoadingSpinner from "../loadingSpinner";
import RoleDropdown, { RoleDropdownItem } from "./roleDropdown";
import TextField from "../textField/textField";

export default function SharingTab({ memorial }) {
  const [selected, setSelected] = useState(memorial?.canView || "");
  const [inviteFieldOpen, setInviteFieldOpen] = useState(false);
  const { members, loading } = useMembers(memorial.id);

  return loading || !members ? (
    <LoadingSpinner />
  ) : (
    <>
      {inviteFieldOpen && (
        <div className="mt-8">
          <SettingLabel>Invite People</SettingLabel>
          <TextField />
          <div className="flex justify-end mt-4 mb-8">
            <Button variant="outlined" onClick={() => setInviteFieldOpen(false)}>
              Cancel
            </Button>
            <Button className="ml-2" variant="filled">
              Send
            </Button>
          </div>
          <hr />
        </div>
      )}

      <div className="flex justify-between mt-8">
        <SettingLabel>Who Can view this Heirloom?</SettingLabel>
        <div className="flex items-center">
          {selected === "" && (
            <Button className="mr-4" variant="outlined">
              <div className="flex items-center">
                <Link />
                <span>&nbsp;Copy Shareable Link</span>
              </div>
            </Button>
          )}
          <Button variant="filled" onClick={() => setInviteFieldOpen(true)}>
            Invite Members
          </Button>
        </div>
      </div>

      <Dropdown value={selected} onChange={(e) => setSelected(e.target.value)}>
        <DropdownItem value="MANAGER">
          <Lock className="mr-2 -ml-1 my-auto" />
          Only people invited to this Heirloom page
        </DropdownItem>
        <DropdownItem value="">
          <Link className="mr-2 -ml-1 my-auto" />
          Anyone with the link can view
        </DropdownItem>
      </Dropdown>

      <div className="mt-8 mb-4">
        <SettingLabel>Members</SettingLabel>
        <hr />
        {members.map((mem) => (
          <>
            <PersonRow
              firstName={mem.firstName}
              lastName={mem.lastName}
              email={mem.email}
              imgSrc={mem.profilePicture}
              key={mem.id}
              role={mem.role}
            />
            <hr />
          </>
        ))}
      </div>
    </>
  );
}

function SettingLabel({ children }) {
  return <div className="text-xl font-bold mb-4">{children}</div>;
}

function PersonRow({ firstName, lastName, email, imgSrc, role }) {
  const hasName = !!firstName && !!lastName;
  const [selected, setSelected] = useState(role || "MEMBER");

  const NameComponent = () => (
    <div className="ml-2 flex flex-col justify-center self-stretch">
      <div>{`${firstName} ${lastName}`}</div>
      <div className="text-sm text-gray-500">{email}</div>
    </div>
  );

  const EmailComponent = () => (
    <div className="ml-2 flex flex-col justify-center self-stretch">
      <div>{email}</div>
    </div>
  );

  return (
    <div className="w-full h-full py-2 flex flex-start">
      <div className="w-12 h-12">
        <img
          className="rounded-full border border-gray-100 shadow-sm"
          src={imgSrc}
          alt="user image"
        />
      </div>
      {hasName ? <NameComponent /> : <EmailComponent />}
      <RoleDropdown value={selected} onChange={(e) => setSelected(e.target.value)}>
        <RoleDropdownItem value="MANAGER">Admin</RoleDropdownItem>
        <DropdownItem value="MEMBER">Member</DropdownItem>
      </RoleDropdown>
    </div>
  );
}