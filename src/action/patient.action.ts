'use server';

import PatientClass, { PatientDetails } from "@/model/patient.model";

export const fetch_patient_all = async (): Promise<PatientDetails[]> => {
  try {
    const res = await PatientClass.getAllPatient();
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

export const fetch_patient_by_id = async (uid: number) => {
  return await PatientClass.getPatientByUid(uid);
};

export const insert_patient = async (
  patient: Omit<PatientDetails, "uid" | "created_at">
) => {
  return await PatientClass.addPatient(patient);
};

export const update_patient = async (
  uid: number,
  updates: Partial<Omit<PatientDetails, "uid" | "created_at">>
) => {
  return await PatientClass.updatePatient(uid, updates);
};

export const delete_patient = async (uid: number) => {
  return await PatientClass.deletePatient(uid);
};
