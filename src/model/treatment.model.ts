"use server";

import supabase from "@/db/supabase";

export interface TreatmentDetails {
  id: number;
  uid: number;
  doctor_id: number;
  treatment: string;
  notes: string;
  amount: number;
  mode_of_payment: string;
}

class TreatmentClass {
  static async getAllTreatment(): Promise<
    TreatmentDetails[] | { error: string }
  > {
    const { data, error } = await supabase
      .from("treatment_details")
      .select("*");
    if (error) return { error: error.message };
    return data as TreatmentDetails[];
  }

  static async getTreatmentByUid(
    uid: number
  ): Promise<TreatmentDetails[] | { error: string }> {
    const { data, error } = await supabase
      .from("treatment_details")
      .select("*")
      .eq("uid", uid);
    if (error) return { error: error.message };
    return data as TreatmentDetails[];
  }

  static async getTreatmentsByDoctorId(
    doctor_id: number
  ): Promise<TreatmentDetails[] | { error: string }> {
    const { data, error } = await supabase
      .from("treatment_details")
      .select("*")
      .eq("doctor_id", doctor_id);
    if (error) return { error: error.message };
    return data as TreatmentDetails[];
  }

  static async addTreatment(
    treatment: Omit<TreatmentDetails, "id">
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase
      .from("treatment_details")
      .insert([treatment]);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Treatment added successfully" };
  }

  static async updateTreatment(
    id: number,
    updates: Partial<Omit<TreatmentDetails, "id">>
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase
      .from("treatment_details")
      .update(updates)
      .eq("id", id);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Treatment updated successfully" };
  }

  static async deleteTreatment(
    id: number
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase
      .from("treatment_details")
      .delete()
      .eq("id", id);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Treatment deleted successfully" };
  }
}

export default TreatmentClass;
