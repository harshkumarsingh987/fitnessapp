 import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/trackerApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi
      .me()
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login: async (payload) => {
        const { data } = await authApi.login(payload);
        setUser(data);
      },
      register: async (payload) => {
        const { data } = await authApi.register(payload);
        setUser(data);
      },
      logout: async () => {
        await authApi.logout();
        setUser(null);
      },
      updateUser: async (payload) => {
        const { data } = await authApi.updateProfile(payload);
        setUser(data);
      }
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
