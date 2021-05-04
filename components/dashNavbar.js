import React, { forwardRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import NotifIcon from "@material-ui/icons/Notifications";
import {
  Box,
  Tooltip,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { useApiCall, useAuth } from "../lib/clientSideAuth";
import { useHeirloomCreatContext } from "./createHeirloom/hooks";
import axios from "axios";

export default function DashNavbar() {
  const router = useRouter();
  const userCtx = useAuth();

  const [, dispatch] = useHeirloomCreatContext();
  const open = () => dispatch({ type: "OPEN" });
  const apiCall = useApiCall();
  const toast = useToast();

  const AccountIcon = forwardRef((props, ref) => (
    <Box ref={ref} as="button" {...props}>
      <div className="bg-heirloomOrange rounded-full w-9 h-9 my-auto hover:bg-heirloomOrange-dark transition-colors">
        <span className="flex items-center justify-center items-center text-white h-full">
          {userCtx.user?.firstName?.length ? userCtx.user?.firstName[0] : "A"}
        </span>
      </div>
    </Box>
  ));

  return (
    <>
      <div className="w-full flex items-center px-24 py-3 bg-paper cursor-pointer">
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

          <Menu>
            <Tooltip hasArrow label="Account Settings" bg="blue.800" color="white">
              <MenuButton as={AccountIcon}>
                <button className="bg-heirloomOrange rounded-full w-9 h-9 my-auto hover:bg-heirloomOrange-dark transition-colors">
                  <span className="flex items-center justify-center text-white  box-border">
                    {userCtx.user?.firstName?.length ? userCtx.user?.firstName[0] : "A"}
                  </span>
                </button>
              </MenuButton>
            </Tooltip>
            <MenuList>
              <MenuItem
                color="red"
                onClick={() => {
                  apiCall(() =>
                    axios.post("/api/auth/logout", undefined, { withCredentials: true })
                  )
                    .then(() => {
                      router.push("/");
                    })
                    .catch((e) => {
                      toast({
                        title: "Error",
                        description: "Looks like something went wrong on our end",
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                        position: "bottom-right",
                      });
                    });
                }}
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <hr />
    </>
  );
}
