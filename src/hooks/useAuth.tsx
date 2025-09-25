"use client";

import { useState, useEffect } from "react";
import { username_from_cookies, login, logout } from "@/lib/auth";

const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetch_username = async () => {
      const res = await username_from_cookies();
      const convert: any = res;
      console.log(convert);
      setUser(convert);
    };
    fetch_username();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await login(username, password);
      const convert: any = JSON.stringify(response, null, 2);
      console.log(convert);
      setUser(convert);
      return convert;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return { user, login: handleLogin, logout: handleLogout };
};
export default useAuth;
