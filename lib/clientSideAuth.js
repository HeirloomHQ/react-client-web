import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UserContext = createContext({
  user: undefined,
  loading: undefined,
  login: undefined,
  signup: undefined,
  refresh: undefined,
  setUser: undefined,
  setLoading: undefined,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const signup = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", values, {
        withCredentials: true,
      });
      setUser(data.user);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  const login = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/login", values, {
        withCredentials: true,
      });
      setUser(data.user);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  // refresh function to refresh token cookies
  const refresh = async () => {
    await axios.get("/api/auth/refresh");
    const { data } = await axios.get("/api/profile", {
      withCredentials: true,
    });
    setUser(data.user);
    setLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        refresh,
        setUser,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useAuth() {
  return useContext(UserContext);
}

export function useUser() {
  const { user, refresh, loading, setLoading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const refreshAndFetch = async () => {
      try {
        await refresh();
      } catch (e) {
        return await router.push("/");
      }
    };
    if (!user && !loading) {
      setLoading(true);
      refreshAndFetch();
    }
  }, [user, setLoading, loading, refresh, router]);

  return {
    user,
    loading,
  };
}

export function useUserMock() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
  const [error] = useState("");

  useEffect(() => {
    // fetch id if it exists
    setLoading(true);
    setTimeout(() => {
      setData(MOCK_USER);
      setLoading(false);
    }, 500);
  }, []);

  return { user: data?.user, loading, error };
}

const MOCK_USER = {
  user: {
    email: "test@test.com",
    firstName: "Andrew",
    id: "60353086ebd856702a803f50",
    lastName: "M",
  },
};

/**
 * This function is for wrapping api calls in other components
 * It attempts to make the api call, and if there is an auth error, it refreshes and retries
 * otherwise it throws the original error
 */
export function useApiCall() {
  const router = useRouter();

  return useMemo(() => {
    return async function Retry(request, retries = 1) {
      let reattempt = false;
      try {
        return await request();
      } catch (requestErr) {
        if (
          requestErr.isAxiosError &&
          requestErr.response.status === 401 // only retry for auth error
        ) {
          reattempt = true;
        } else {
          // otherwise throw original error
          throw requestErr;
        }
      }

      if (reattempt) {
        console.log("retrying");
        // refresh the token
        await axios.get("/api/auth/refresh", {
          withCredentials: true,
        });

        // retry our request
        try {
          await Retry(request, retries - 1);
        } catch (e) {
          await router.push("/");
        }
      }
    };
  }, [router]);
}
