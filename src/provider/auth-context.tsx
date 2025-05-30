"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { User } from "@/types/user.type";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { toastStyle } from "@/lib/toast";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token && !user) {
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/auth/profile");
      const userData = response.data;
      setUser(userData);

      Cookies.set("user_role", userData.role, {
        sameSite: "strict",
        expires: 7,
      });
    } catch (error) {
      console.error("Failed to fetch profile", error);
      logout();
    }
  };

  const login = async (token: string) => {
    try {
      Cookies.set("token", token, {
        sameSite: "strict",
        expires: 7,
      });

      await fetchProfile();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user_role");
    setUser(null);
    toast("Logout successful", {
      description: "Your session has ended.",
      style: toastStyle.success,
    });
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
