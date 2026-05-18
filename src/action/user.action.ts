"use server";

import UserClass from "@/model/user.model";

export const register = async (
  username: string,
  password: string,
  name: string,
  email: string,
  contact_number: string,
  role: string,
) => {
  return await UserClass.createUser({
    username,
    password,
    name,
    email,
    contact_number,
    role,
    created_by: username,
    updated_by: username,
  });
};
