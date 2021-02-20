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
    id: "602de0b05384d74d57bf1b5a",
    pageSettings: {
      description: "A good dude.",
      firstName: "Brad",
      lastName: "Gobright",
    },
    privacySettings: {
      canDelete: "OWNER",
      canEditPrivacy: "MANAGER",
      canManage: "MANAGER",
      canPost: "MANAGER",
      canView: "MANAGER",
    },
  },
  role: {
    id: "602de09196e232faf2d40e7a",
    memorial: "602de09196e232faf2d40e79",
    role: "OWNER",
    user: "602de03a815c5bd2aefaf893",
  },
};
