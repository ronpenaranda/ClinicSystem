"use server";

import supabase from "@/db/supabase";

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  contact_number: string;
  role: string;
  created_by: string;
  updated_by: string;
}

class UserClass {
  static async getUserByUsername(
    username: string,
  ): Promise<User | null | { error: string }> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();
    if (error) return { error: error.message };
    return data as User;
  }

  static async createUser(
    user: Omit<User, "id">,
  ): Promise<{ success: boolean; message: string }> {
    const existing = await UserClass.getUserByUsername(user.username);
    if (existing && !("error" in existing)) {
      return { success: false, message: "Username already exists" };
    }
    const { error } = await supabase.from("users").insert([user]);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Account created successfully" };
  }
}

export default UserClass;
