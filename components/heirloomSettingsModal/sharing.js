import React, { useState } from "react";
import Button from "../button";
import Dropdown, { DropdownItem } from "../dropdown";
import Link from "../icons/link";
import Lock from "../icons/lock";
import { useMembers } from "../../lib/members";
import LoadingSpinner from "../loadingSpinner";

export default function SharingTab({ memorial }) {
  const [selected, setSelected] = useState(memorial?.canView || "");
  const { members, loading } = useMembers(memorial?.id);
  return loading || !members ? (
    <LoadingSpinner />
  ) : (
    <>
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
          <Button variant="filled">Invite Members</Button>
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
            <PersonCard
              firstName={mem.firstName}
              lastName={mem.lastName}
              email={mem.email}
              imgSrc={mem.profilePicture}
              key={mem.id}
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

function PersonCard({ firstName, lastName, email, imgSrc }) {
  const hasName = !!firstName && !!lastName;

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
    <div className="w-full  h-full py-2 flex flex-start">
      <div className="w-12 h-12">
        <img
          className="rounded-full border border-gray-100 shadow-sm"
          src={imgSrc}
          alt="user image"
        />
      </div>
      {hasName ? <NameComponent /> : <EmailComponent />}
    </div>
  );
}
