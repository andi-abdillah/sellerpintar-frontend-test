"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { User } from "@/types/user.type";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { toastStyle } from "@/lib/toast";
import { SignJWT, jwtVerify } from "jose";

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
    const userJWT = Cookies.get("user");

    if (userJWT) {
      decodeUser(userJWT);
    } else if (token) {
      fetchAndStoreProfile();
    }
  }, []);

  const decodeUser = async (jwt: string) => {
    try {
      const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET || "JWT_SECRET";
      const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(secretKey)
      );
      const userData = payload as User;
      setUser(userData);
    } catch {
      toast("Invalid JWT", {
        description: "Unable to decode user information. Please log in again.",
        style: toastStyle.error,
      });
      logout();
    }
  };

  const fetchAndStoreProfile = async (): Promise<User> => {
    try {
      const response = await axiosInstance.get("/auth/profile");
      const userData: User = response.data;
      setUser(userData);

      const jwt = await new SignJWT(userData)
        .setProtectedHeader({ alg: "HS256" })
        .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || "JWT_SECRET"));

      Cookies.set("user", jwt, {
        sameSite: "strict",
        expires: 7,
      });

      return userData;
    } catch {
      toast("Unexpected error", {
        description: "Could not retrieve user data. Please try again later.",
        style: toastStyle.error,
      });
      logout();
      throw new Error("Failed to fetch profile");
    }
  };

  const login = async (token: string) => {
    try {
      Cookies.set("token", token, {
        sameSite: "strict",
        expires: 7,
      });

      const userData = await fetchAndStoreProfile();

      if (userData.role === "Admin") {
        router.push("/admin/dashboard");
      } else if (userData.role === "User") {
        router.push("/user/home");
      } else {
        toast("Unexpected error", {
          description: "Unknown user role.",
          style: toastStyle.error,
        });
      }
    } catch {
      toast("Unexpected error", {
        description: "Something went wrong. Please try again later.",
        style: toastStyle.error,
      });
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
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
