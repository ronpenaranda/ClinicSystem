import { username_from_cookies } from "./auth";

export async function requireAuth(role: string = "Yato") {
  const auth = await username_from_cookies();

  if (!auth || auth !== role) {
    return { authorized: false, user: auth };
  }

  return { authorized: true, user: auth };
}
