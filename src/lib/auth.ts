"use server";

import { cookies } from "next/headers";
import * as jose from "jose";
import UserClass from "@/model/user.model";

const secret = new TextEncoder().encode("supersecretkey");

const SUPER_ADMIN = {
  username: "superadmin",
  password: "superadmin123",
  name: "Super Admin",
  role: "superadmin",
};

export const verify_token = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("ERROR: ", err);
    return null;
  }
};

export const login = async (
  username: string,
  password: string,
): Promise<{ success: boolean; message: string }> => {
  const cookieStore = await cookies();

  try {
    if (
      username === SUPER_ADMIN.username &&
      password === SUPER_ADMIN.password
    ) {
      const token = await new jose.SignJWT({
        uid: SUPER_ADMIN.username,
        role: SUPER_ADMIN.role,
        name: SUPER_ADMIN.name,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secret);

      cookieStore.set("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });
      return { success: true, message: "Login successful" };
    }

    const user = await UserClass.getUserByUsername(username);

    if (!user || "error" in user) {
      return { success: false, message: "Invalid username or password" };
    }

    if (user.password !== password) {
      return { success: false, message: "Invalid username or password" };
    }

    const token = await new jose.SignJWT({
      uid: user.username,
      role: user.role,
      name: user.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    return { success: true, message: "Login successful" };
  } catch (err) {
    console.error("ERROR: ", err);
    return { success: false, message: "An error occurred during login" };
  }
};

export const logout = async () => {
  const cookieStore = await cookies();
  try {
    cookieStore.delete("token");
  } catch (err) {
    console.error("ERROR: ", err);
    return null;
  }
};

export const username_from_cookies = async () => {
  const cookieStore = await cookies();
  try {
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    const res = await verify_token(token);
    return res?.uid ?? "";
  } catch (err) {
    console.error("ERROR: ", err);
    return null;
  }
};

export const get_user_from_cookies = async () => {
  const cookieStore = await cookies();
  try {
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    const res = await verify_token(token);
    if (!res) return null;
    return {
      uid: res.uid as string,
      role: res.role as string,
      name: res.name as string,
    };
  } catch (err) {
    console.error("ERROR: ", err);
    return null;
  }
};
