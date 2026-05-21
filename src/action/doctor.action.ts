"use server";

import DoctorClass, { Doctor } from "@/model/doctor.model";
import {
  DoctorScheduleClass,
  DoctorSchedule,
} from "@/model/doctor-schedule.model";
import { get_user_from_cookies } from "@/lib/auth";

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

export const fetch_doctor_by_id = async (
  id: number,
): Promise<Doctor | null> => {
  try {
    const res = await DoctorClass.getDoctorById(id);
    if ("error" in res) {
      console.error(res.error);
      return null;
    }
    return res[0];
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const insert_doctor = async (
  doctor: Omit<Doctor, "id" | "hire_date">,
) => {
  const user = await get_user_from_cookies();
  if (!user) return { success: false, message: "Not authenticated" };

  const allowedRoles = ["admin", "superadmin"];
  if (!allowedRoles.includes(user.role)) {
    return { success: false, message: "Only admins can add doctors" };
  }

  return await DoctorClass.addDoctor(doctor);
};

export const update_doctor = async (
  id: number,
  updates: Partial<Omit<Doctor, "id" | "hire_date">>,
) => {
  const user = await get_user_from_cookies();
  if (!user) return { success: false, message: "Not authenticated" };

  const allowedRoles = ["admin", "superadmin", "doctor"];
  if (!allowedRoles.includes(user.role)) {
    return { success: false, message: "Not authorized to edit doctors" };
  }

  if (user.role === "doctor") {
    const doctor = await DoctorClass.getDoctorById(id);
    if ("error" in doctor)
      return { success: false, message: "Doctor not found" };
    if (doctor[0]?.name !== user.name) {
      return { success: false, message: "You can only edit your own record" };
    }
  }

  return await DoctorClass.updateDoctor(id, updates);
};

export const delete_doctor = async (id: number) => {
  const user = await get_user_from_cookies();
  if (!user) return { success: false, message: "Not authenticated" };

  const allowedRoles = ["admin", "superadmin"];
  if (!allowedRoles.includes(user.role)) {
    return { success: false, message: "Only admins can delete doctors" };
  }

  const doctor = await DoctorClass.getDoctorById(id);
  if ("error" in doctor) return { success: false, message: "Doctor not found" };

  if (user.role !== "superadmin" && doctor[0]?.name === user.name) {
    return {
      success: false,
      message: "You cannot delete your own doctor record",
    };
  }

  return await DoctorClass.deleteDoctor(id);
};

export const fetch_all_doctor_schedules = async (): Promise<
  DoctorSchedule[]
> => {
  try {
    const res = await DoctorScheduleClass.getAllSchedules();
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

export const fetch_doctor_schedules_by_doctor_id = async (
  doctorId: number,
): Promise<DoctorSchedule[]> => {
  try {
    const res = await DoctorScheduleClass.getSchedulesByDoctorId(doctorId);
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

export const insert_doctor_schedule = async (schedule: DoctorSchedule) => {
  return await DoctorScheduleClass.createSchedule(schedule);
};

export const update_doctor_schedule = async (
  id: number,
  updates: Partial<DoctorSchedule>,
) => {
  return await DoctorScheduleClass.updateSchedule(id, updates);
};

export const delete_doctor_schedule = async (id: number) => {
  return await DoctorScheduleClass.deleteSchedule(id);
};
