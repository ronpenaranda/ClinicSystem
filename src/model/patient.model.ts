"use server";

import supabase from "@/db/supabase";

export interface PatientDetails {
  uid: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  address: string;
  gender: "Male" | "Female" | "Other";
  phone_number: string;
  email_address: string;
  created_by: string;
  created_at: string;
  remarks?: string;
}

class PatientClass {
  static async getAllPatient(): Promise<PatientDetails[] | { error: string }> {
    const { data, error } = await supabase.from("patient_details").select("*");
    if (error) return { error: error.message };
    return data as PatientDetails[];
  }

  static async getPatientByUid(
    uid: number
  ): Promise<PatientDetails[] | { error: string }> {
    const { data, error } = await supabase
      .from("patient_details")
      .select("*")
      .eq("uid", uid);
    if (error) return { error: error.message };
    return data as PatientDetails[];
  }

  static async addPatient(
    patient: Omit<PatientDetails, "uid" | "created_at">
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase
      .from("patient_details")
      .insert([{ ...patient, created_at: new Date().toISOString() }]);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Patient added successfully" };
  }

  static async updatePatient(
    uid: number,
    patient: Partial<Omit<PatientDetails, "uid" | "created_at">>
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase
      .from("patient_details")
      .update(patient)
      .eq("uid", uid);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Patient updated successfully" };
  }

  static async deletePatient(
    uid: number
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase
      .from("patient_details")
      .delete()
      .eq("uid", uid);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Patient deleted successfully" };
  }
}

export default PatientClass;
