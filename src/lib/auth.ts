"use server";

import { cookies } from "next/headers";
import * as jose from "jose";

const secret = new TextEncoder().encode("supersecretkey");

export const verify_token = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("ERROR: ", err);
    return null;
  }
};

export const login = async (username: string, password: string) => {
  const cookieStore = await cookies();

  try {
    const token = await new jose.SignJWT({ uid: username, name: password })
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
    return token;
  } catch (err) {
    console.error("ERROR: ", err);
    return null;
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
