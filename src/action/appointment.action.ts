"use server";

import AppointmentClass, { Appointment } from "@/model/appointment.model";

export const fetch_appointments_all = async (): Promise<Appointment[]> => {
  try {
    const res = await AppointmentClass.getAllAppointments();
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

export const fetch_appointment_by_id = async (
  id: number
): Promise<Appointment | null> => {
  try {
    const res = await AppointmentClass.getAppointmentById(id);
    if ("error" in res) {
      console.error(res.error);
      return null;
    }
    return res;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const insert_appointment = async (
  appointment: Omit<Appointment, "id" | "created_at" | "updated_at">
) => {
  return await AppointmentClass.addAppointment(appointment);
};

export const update_appointment = async (
  id: number,
  updates: Partial<Omit<Appointment, "id" | "created_at" | "updated_at">>
) => {
  return await AppointmentClass.updateAppointment(id, updates);
};

export const delete_appointment = async (id: number) => {
  return await AppointmentClass.deleteAppointment(id);
};
