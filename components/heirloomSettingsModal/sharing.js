import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

import Button from "../button";
import Dropdown, { DropdownItem } from "../dropdown";
import Link from "../icons/link";
import Lock from "../icons/lock";
import LoadingSpinner from "../loadingSpinner";
import RoleDropdown from "./roleDropdown";
import SettingLabel from "./settingsLabel";
import { useMemorial, useUpdateMemorial } from "../../lib/memorial";
import { useApiCall } from "../../lib/clientSideAuth";
import { useReloadMembers } from "../../lib/members";
import EmailChipTextField from "../createHeirloom/emailChipTextField";

export default function SharingTab({ members, loading }) {
  const { memorial, setMemorial, reloadMemorials } = useMemorial();
  const [inviteFieldOpen, setInviteFieldOpen] = useState(false);
  const [emails, setEmails] = useState([]);
  const addEmail = (email) => setEmails([...emails, email]);
  const popEmail = (email) => setEmails(emails.filter((value) => value != email));

  const updateMemorial = useUpdateMemorial();

  const apiCall = useApiCall();

  useEffect(() => {
    if (!inviteFieldOpen) setEmails([]);
  }, [inviteFieldOpen]);

  const updateMemberRole = (memberID) => {
    return async (role) =>
      apiCall(() =>
        axios.put(
          `/api/memorials/${memorial?.id}/members/${memberID}`,
          { role },
          { withCredentials: true }
        )
      );
  };

  const toast = useToast();
  const sendInvites = async () => {
    try {
      await apiCall(() =>
        axios.post(
          `/api/invites?memorial=${memorial.id}`,
          { emails },
          { withCredentials: true }
        )
      );
      toast({
        title: "Success",
        description: "Invites sent",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
      setEmails([]);
      setInviteFieldOpen(false);
    } catch (e) {
      console.log(e);
      toast({
        title: "Error",
        description: "Looks like something went wrong on our end",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return loading || !members ? (
    <LoadingSpinner />
  ) : (
    <Spacer className="flex-grow overflow-y-auto">
      {inviteFieldOpen && (
        <div className="mt-8">
          <SettingLabelText>Invite People</SettingLabelText>
          <EmailChipTextField
            id="invite-people-input"
            emails={emails}
            onAddEmail={addEmail}
            onDeleteEmail={popEmail}
          />
          <div className="flex justify-end mt-4 mb-8">
            <Button variant="outlined" onClick={() => setInviteFieldOpen(false)}>
              Cancel
            </Button>
            <Button
              className="ml-2"
              variant="filled"
              onClick={sendInvites}
              disabled={emails.length === 0}
            >
              Send
            </Button>
          </div>
          <hr />
        </div>
      )}

      <div className="flex justify-between mt-8">
        <SettingLabelText>Who Can view this Heirloom?</SettingLabelText>
        <div className="flex items-center">
          {memorial?.canView === "" && (
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

      <Dropdown
        value={memorial?.canView || ""}
        onChange={(e) => {
          e.persist();
          const data = { id: memorial.id, canView: e.target.value };
          updateMemorial(data)
            .then(() => {
              setMemorial({ ...memorial, canView: data.canView });
              reloadMemorials();
            })
            .catch((e) => console.log(e));
        }}
      >
        <DropdownItem value="MANAGER">
          <Lock className="mr-2 -ml-1 my-auto" />
          Admins only
        </DropdownItem>
        <DropdownItem value="MEMBER">
          <Lock className="mr-2 -ml-1 my-auto" />
          Only people invited to this Heirloom page
        </DropdownItem>
        <DropdownItem value="">
          <Link className="mr-2 -ml-1 my-auto" />
          Anyone with the link can view
        </DropdownItem>
      </Dropdown>

      <div className="mt-8 mb-4">
        <SettingLabel help="Members are people you invite to your Heirloom page. You can choose how members interact with your Heirloom page. Admins have full access to change page settings and share the page with new members. Regular members don’t have admin control, but they can post content. View-only members cannot add content to the memorial page.">
          Members
        </SettingLabel>
        <hr />
        {members.length ? (
          members.map((mem) => (
            <>
              <PersonRow
                firstName={mem.firstName}
                lastName={mem.lastName}
                email={mem.email}
                imgSrc={mem.profilePicture}
                key={mem.id}
                role={mem.role}
                onUpdateRole={updateMemberRole(mem.id)}
              />
              <hr />
            </>
          ))
        ) : (
          <p className="mt-4 text-gray-500 font-sans">
            People you invite to this memorial will appear here.
          </p>
        )}
      </div>
    </Spacer>
  );
}

function SettingLabelText({ children }) {
  return <div className="text-xl font-bold mb-4">{children}</div>;
}

function PersonRow({ firstName, lastName, email, imgSrc, role, onUpdateRole }) {
  const hasName = !!firstName && !!lastName;
  const reloadMembers = useReloadMembers();

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
          className="rounded-full border border-gray-100 shadow-sm h-full object-cover"
          src={imgSrc || "https://i.stack.imgur.com/l60Hf.png"}
          alt="user image"
        />
      </div>
      {hasName ? <NameComponent /> : <EmailComponent />}
      {role === "OWNER" ? (
        <span className="font-medium font-sans ml-auto my-auto mr-10">Owner</span>
      ) : (
        <RoleDropdown
          value={role || "MEMBER"}
          onChange={(value) => {
            onUpdateRole(value)
              .then(() => reloadMembers())
              .catch((e) => console.log(e));
          }}
        />
      )}
    </div>
  );
}

function Spacer({ className, children }) {
  return <div className={`${className} px-16`}>{children}</div>;
}
