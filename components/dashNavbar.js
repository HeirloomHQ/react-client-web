import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import NotifIcon from "@material-ui/icons/Notifications";
import { Tooltip } from "@chakra-ui/react";
import { useAuth } from "../lib/clientSideAuth";
import { useHeirloomCreatContext } from "./createHeirloom/hooks";

export default function DashNavbar() {
  const router = useRouter();
  const userCtx = useAuth();

  const [_, dispatch] = useHeirloomCreatContext();
  const open = () => dispatch({ type: "OPEN" });

  return (
    <>
      <div className="w-full flex items-center px-24 py-3 bg-paper">
        <Image
          src="/assets/img/nav-logo.png"
          alt="Heirloom logo"
          height={36}
          width={147}
          onClick={() => router.push("/")}
        />
        <div className="ml-auto flex">
          <Tooltip hasArrow label="Create New Heirloom" bg="blue.800" color="white">
            <IconButton style={{ marginRight: "1rem" }} size="small" onClick={open}>
              <AddIcon className="text-black" fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip hasArrow label="Notifications" bg="blue.800" color="white">
            <IconButton style={{ "margin-right": "1rem" }} size="small">
              <NotifIcon className="text-black" fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip hasArrow label="Account Settings" bg="blue.800" color="white">
            <button className="bg-heirloomOrange rounded-full w-9 h-9 my-auto hover:bg-heirloomOrange-dark transition-colors">
              <span className="flex items-center justify-center text-white  box-border">
                {userCtx.user?.firstName?.length ? userCtx.user?.firstName[0] : "A"}
              </span>
            </button>
          </Tooltip>
        </div>
      </div>
      <hr />
    </>
  );
}
