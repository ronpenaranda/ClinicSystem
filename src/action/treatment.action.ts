"use server";

import TreatmentClass, { TreatmentDetails } from "@/model/treatment.model";

export const fetch_all_treatments = async () => {
  return await TreatmentClass.getAllTreatment();
};

export const fetch_treatment_by_uid = async (uid: number) => {
  try {
    const res = await TreatmentClass.getTreatmentByUid(uid);
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

export const fetch_treatment_by_doctor_id = async (
  doctorId: number
): Promise<TreatmentDetails[]> => {
  try {
    const res = await TreatmentClass.getTreatmentsByDoctorId(doctorId);
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

export const insert_treatment = async (
  treatment: Omit<TreatmentDetails, "id">
) => {
  return await TreatmentClass.addTreatment(treatment);
};

export const update_treatment = async (
  id: number,
  updates: Partial<Omit<TreatmentDetails, "id">>
) => {
  return await TreatmentClass.updateTreatment(id, updates);
};

export const delete_treatment = async (id: number) => {
  return await TreatmentClass.deleteTreatment(id);
};
