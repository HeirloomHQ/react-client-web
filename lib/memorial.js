import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useApiCall } from "./clientSideAuth";

export const MemorialContext = createContext(undefined);

export function MemorialsProvider({ children }) {
  const [memorials, setMemorials] = useState(undefined);
  const [memorial, setMemorial] = useState(undefined);
  const [roles, setRoles] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const [reloadMemorialsFlag, setReloadMemorialsFlag] = useState(false);
  const [reloadMembersFlag, setReloadMembersFlag] = useState(false);

  return (
    <MemorialContext.Provider
      value={{
        memorial,
        setMemorial,
        memorials,
        setMemorials,
        roles,
        setRoles,
        loading,
        setLoading,
        reloadMemorialsFlag,
        reloadMemorials: () => setReloadMemorialsFlag(!reloadMemorialsFlag),
        reloadMembersFlag,
        reloadMembers: () => setReloadMembersFlag(!reloadMembersFlag),
      }}
    >
      {children}
    </MemorialContext.Provider>
  );
}

export function useMemorial() {
  const { memorial, setMemorial, loading, reloadMemorials, setLoading } = useContext(
    MemorialContext
  );
  return { memorial, setMemorial, loading, setLoading, reloadMemorials };
}

export function useMemorials(userId) {
  const {
    loading,
    setLoading,
    memorials,
    setMemorials,
    setMemorial,
    roles,
    setRoles,
    reloadMemorialsFlag,
  } = useContext(MemorialContext);
  const [error] = useState("");
  const request = useApiCall();

  useEffect(() => {
    const fetchMemorials = async () => {
      try {
        setLoading(true);
        const response = await request(() =>
          axios.get("/api/memorials", { withCredentials: true })
        );
        setMemorials(response?.data?.memorials);
        setRoles(response?.data?.roles);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };

    // only call the fetch memorials if we have a valid user
    if (!!userId) {
      fetchMemorials();
    } else {
      // set it to undefined if no id
      setRoles(undefined);
      setMemorials(undefined);
      setMemorial(undefined);
    }
  }, [
    userId,
    reloadMemorialsFlag,
    request,
    setLoading,
    setMemorials,
    setRoles,
    setMemorial,
  ]);

  return { memorials, roles, loading, error, setMemorial };
}

// function to update a memorial
export function useUpdateMemorial() {
  const apiCall = useApiCall();
  return useMemo(
    () =>
      function udpateMemorial(memorial) {
        return apiCall(() =>
          axios.put(`/api/memorials/${memorial.id}/settings`, memorial, {
            withCredentials: true,
          })
        );
      },
    [apiCall]
  );
}

export function useMemorialsMock(userId) {
  const {
    loading,
    setLoading,
    memorials,
    setMemorials,
    setMemorial,
    roles,
    setRoles,
  } = useContext(MemorialContext);
  const [error] = useState("");

  useEffect(() => {
    // fetch id if it exists
    if (!!userId) {
      setLoading(true);
      setTimeout(() => {
        setMemorials(MOCK_MEMORIALS_FOR_USER.memorials);
        setRoles(MOCK_MEMORIALS_FOR_USER.roles);
        setLoading(false);
      }, 500);
    } else {
      // set it to undefined if no id
      setRoles(undefined);
      setMemorials(undefined);
      setMemorial(undefined);
    }
  }, [setLoading, setMemorial, setMemorials, setRoles, userId]);

  return { memorials, roles, loading, error };
}

const MOCK_DATA = {
  memorial: {
    bio: "one helluva test",
    born: "Jan 2nd",
    canDelete: "OWNER",
    canManage: "MANAGER",
    canPost: "MANAGER",
    canView: "MANAGER",
    coverPhoto:
      "https://images.unsplash.com/photo-1579529547132-6093b5da10fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    description: "A good dude.",
    died: "Jan 3rd",
    firstName: "Brad",
    homeTown: "LA",
    id: "6035e134d72a5b4e337c2deb",
    lastName: "Gobright",
    pageTheme: "#FF7F59",
  },
  role: {
    id: "602de09196e232faf2d40e7a",
    memorial: "602de09196e232faf2d40e79",
    role: "OWNER",
    user: "602de03a815c5bd2aefaf893",
  },
};

const MOCK_MEMORIALS_FOR_USER = {
  memorials: [
    {
      bio: "one helluva test",
      born: "Jan 2nd",
      canDelete: "OWNER",
      canManage: "MANAGER",
      canPost: "MANAGER",
      canView: "MANAGER",
      coverPhoto:
        "https://images.unsplash.com/photo-1579529547132-6093b5da10fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      description: "A life centered around climbing.",
      died: "Jan 3rd",
      firstName: "Brad",
      homeTown: "LA",
      id: "6035e134d72a5b4e337c2deb",
      lastName: "Gobright",
      pageTheme: "#FF7F59",
    },
    {
      bio: "ONE helluva test",
      born: "Jan 2nd",
      canDelete: "OWNER",
      canManage: "MANAGER",
      canPost: "MANAGER",
      canView: "MANAGER",
      coverPhoto:
        "https://images.unsplash.com/photo-1544737593-0e686eaeb328?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
      description: "Father, husband, teacher.",
      died: "Jan 3rd",
      firstName: "Phil",
      homeTown: "LA",
      id: "6035e243d72a5b4e337c2ded",
      lastName: "Gingrich",
      pageTheme: "#FF7F59",
    },
    {
      bio: "one helluva test",
      born: "Jan 2nd",
      canDelete: "OWNER",
      canManage: "MANAGER",
      canPost: "MANAGER",
      canView: "MANAGER",
      coverPhoto:
        "https://images.unsplash.com/photo-1585870683904-a382fbb42754?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      description: "An artist and free spirit",
      died: "Jan 3rd",
      firstName: "Alice",
      homeTown: "LA",
      id: "6038156668889ea7d643f635",
      lastName: "Johnson",
      pageTheme: "#FF7F59",
    },
  ],
  roles: {
    "6035e134d72a5b4e337c2deb": "MANAGER",
    "6035e243d72a5b4e337c2ded": "OWNER",
    "6038156668889ea7d643f635": "OWNER",
  },
};
