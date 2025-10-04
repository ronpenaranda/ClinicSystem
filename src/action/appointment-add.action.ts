"use server";
import { Appointment } from "@/model/appointment.model";
import { fetch_doctor_by_id } from "./doctor.action";
import { fetch_patient_by_id } from "./patient.action";
import { insert_appointment } from "./appointment.action";

export const add_appointment = async (body: Appointment) => {
  try {
    const patient = await fetch_patient_by_id(body.patient_uid);
    const doctor = await fetch_doctor_by_id(body.doctor_id);

    console.log("dog");
    console.log(patient);

    const now = new Date().toISOString();

    const mutateBody = {
      patient_uid: body.patient_uid,
      doctor_id: body.doctor_id,
      patient_name: Array.isArray(patient)
        ? patient.map((p) => `${p.first_name}`).join(", ")
        : patient ?? "",
      doctor_name: Array.isArray(doctor)
        ? doctor.map((d) => d.name).join(", ")
        : doctor ?? "",
      appointment_date: body.appointment_date,
      start_time: body.start_time,
      end_time: body.end_time,
      status: "Scheduled",
      remarks: "",
      created_at: now,
      updated_at: now,
    };

    const response = await insert_appointment(mutateBody);
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
};
