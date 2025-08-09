"use server";

import DoctorClass, { Doctor } from "@/model/doctor.model";

export const fetch_doctors_all = async (): Promise<Doctor[]> => {
  try {
    const res = await DoctorClass.getAllDoctors();
    if ("error" in res) {
      console.error(res.error);
      return [];
    }
    return res;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetch_doctor_by_id = async (id: number): Promise<Doctor[]> => {
  try {
    const res = await DoctorClass.getDoctorById(id);
    if ("error" in res) {
      console.error(res.error);
      return [];
    }
    return res;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const insert_doctor = async (
  doctor: Omit<Doctor, "id" | "hire_date">
) => {
  return await DoctorClass.addDoctor(doctor);
};

export const update_doctor = async (
  id: number,
  updates: Partial<Omit<Doctor, "id" | "hire_date">>
) => {
  return await DoctorClass.updateDoctor(id, updates);
};

export const delete_doctor = async (id: number) => {
  return await DoctorClass.deleteDoctor(id);
};
