import { createContext, useContext, useState, useEffect } from "react";
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
    try {
      setLoading(true);
      await axios.post("/api/auth/refresh", {
        withCredentials: true,
      });
      const { data } = await axios.post("/api/auth/profile", {
        withCredentials: true,
      });
      setUser(data.user);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
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
  const { user, refresh, loading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const refreshAndFetch = async () => {
      try {
        await refresh;
      } catch (e) {
        return await router.push("/");
      }
    };
    if (!user) refreshAndFetch();
  }, [user, refresh, router]);

  return {
    user,
    loading,
  };
}
