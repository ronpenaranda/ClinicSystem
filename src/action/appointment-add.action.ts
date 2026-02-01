"use server";
import { Appointment } from "@/model/appointment.model";
import { fetch_doctor_by_id } from "./doctor.action";
import { fetch_patient_by_id } from "./patient.action";
import { insert_appointment } from "./appointment.action";
import { PatientDetails } from "@/model/patient.model";

export const add_appointment = async (body: Appointment) => {
  try {
    const patient = await fetch_patient_by_id(body.patient_uid);
    const doctor = await fetch_doctor_by_id(body.doctor_id);

    const now = new Date().toISOString();

    const mutateBody = {
      patient_uid: body.patient_uid,
      doctor_id: body.doctor_id,
      patient_name: `${patient?.first_name} ${patient?.middle_name} ${patient?.last_name}`,
      doctor_name: `${doctor?.name}`,
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
