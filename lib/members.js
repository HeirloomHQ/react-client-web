import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useApiCall } from "./clientSideAuth";
import { MemorialContext } from "./memorial";

/*
Actual request
 */
export function useMembers() {
  const { memorial, reloadMembersFlag } = useContext(MemorialContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
  const [error] = useState("");
  const apiCall = useApiCall();

  const memorialID = memorial?.id;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await apiCall(() =>
          axios.get(`/api/memorials/${memorialID}/members`)
        );
        setData(response.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    console.log(memorialID);
    if (!!memorialID) fetchMembers();
  }, [apiCall, memorialID, reloadMembersFlag]);

  return { members: data?.members, loading, error };
}

export function useReloadMembers() {
  const { reloadMembers } = useContext(MemorialContext);
  return reloadMembers;
}

/*
Use mock data for now
 */
export function useMembersMock(memorialID) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
  const [error] = useState("");

  useEffect(() => {
    // fetch id if it exists
    if (memorialID) {
      setLoading(true);
      setTimeout(() => {
        setData(MOCK_DATA);
        setLoading(false);
      }, 500);
    } else {
      // set it to undefined if no id
      setData(undefined);
    }
  }, [memorialID]);

  return { members: data?.members, loading, error };
}

const MOCK_DATA = {
  members: [
    {
      email: "test@test.com",
      firstName: "Jim",
      id: "60353086ebd856702a803f50",
      profilePicture: "https://randomuser.me/api/portraits/women/81.jpg",
      lastName: "Gobright",
      role: "MANAGER",
    },
    {
      email: "test@test.com",
      firstName: "Jim",
      id: "60353086ebd856702a803f50",
      profilePicture: "https://randomuser.me/api/portraits/women/81.jpg",
      lastName: "Gobright",
      role: "MEMBER",
    },
    {
      email: "test@test.com",
      firstName: "Jim",
      id: "60353086ebd856702a803f50",
      profilePicture: "https://randomuser.me/api/portraits/women/81.jpg",
      lastName: "Gobright",
      role: "MANAGER",
    },
    {
      email: "test@test.com",
      firstName: "Jim",
      id: "60353086ebd856702a803f50",
      profilePicture: "https://randomuser.me/api/portraits/women/81.jpg",
      lastName: "Gobright",
      role: "MANAGER",
    },
    {
      email: "test@test.com",
      firstName: null,
      id: "60353086ebd856702a803f50",
      profilePicture: "https://randomuser.me/api/portraits/women/81.jpg",
      lastName: null,
      role: "MEMBER",
    },
    {
      email: "test@test.com",
      firstName: "Jim",
      id: "60353086ebd856702a803f50",
      profilePicture: "https://randomuser.me/api/portraits/women/81.jpg",
      lastName: "Gobright",
      role: "MANAGER",
    },
    {
      email: "test@test.com",
      firstName: null,
      id: "60353086ebd856702a803f50",
      profilePicture: "https://randomuser.me/api/portraits/women/81.jpg",
      lastName: null,
      role: "MANAGER",
    },
  ],
};
