"use server";

import DoctorClass, { Doctor } from "@/model/doctor.model";
import {
  DoctorScheduleClass,
  DoctorSchedule,
} from "@/model/doctor-schedule.model";
import { requireAuth } from "@/lib/req-auth";

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
  const { authorized } = await requireAuth();
  return authorized
    ? await DoctorClass.deleteDoctor(id)
    : { success: false, message: "Not authorized" };
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
  doctorId: number
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
  updates: Partial<DoctorSchedule>
) => {
  return await DoctorScheduleClass.updateSchedule(id, updates);
};

export const delete_doctor_schedule = async (id: number) => {
  return await DoctorScheduleClass.deleteSchedule(id);
};
