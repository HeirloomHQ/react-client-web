import { useEffect, useState } from "react";

/*
Use mock data for now
 */
export function useMemorial(memorialID) {
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

  return { memorial: data?.memorial, role: data?.memorial, loading, error };
}

const MOCK_DATA = {
  memorial: {
    bio: "one helluva test",
    born: "Jan 2nd",
    canDelete: "OWNER",
    canManage: "MANAGER",
    canPost: "MANAGER",
    canView: "MANAGER",
    coverPhoto: "http://profilepic",
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
