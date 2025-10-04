"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { username_from_cookies, login, logout } from "@/lib/auth";

const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetch_username = async () => {
      const res = await username_from_cookies();
      const convert: any = res;
      setUser(convert);
    };
    fetch_username();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await login(username, password);
      const convert: any = JSON.stringify(response, null, 2);
      setUser(convert);
      return convert;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setUser(null);
    setLoading(false);
    router.push("/login");
  };

  return { user, login: handleLogin, logout: handleLogout, loading };
};

export default useAuth;
