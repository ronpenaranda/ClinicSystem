"use server";

import supabase from "@/db/supabase";

export interface Doctor {
  id?: number;
  name: string;
  specialization: string;
  contact_number?: string;
  email?: string;
  license_number: string;
  hire_date?: string;
  notes?: string;
}

class DoctorClass {
  static async getAllDoctors(): Promise<Doctor[] | { error: string }> {
    const { data, error } = await supabase.from("doctors").select("*");
    if (error) return { error: error.message };
    return data as Doctor[];
  }

  static async getDoctorById(
    id: number
  ): Promise<Doctor[] | { error: string }> {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("id", id);
    if (error) return { error: error.message };
    return data as Doctor[];
  }

  static async addDoctor(
    doctor: Omit<Doctor, "id" | "hire_date">
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase
      .from("doctors")
      .insert([
        { ...doctor, hire_date: new Date().toISOString().slice(0, 10) },
      ]);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Doctor added successfully" };
  }

  static async updateDoctor(
    id: number,
    doctor: Partial<Omit<Doctor, "id" | "hire_date">>
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase
      .from("doctors")
      .update(doctor)
      .eq("id", id);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Doctor updated successfully" };
  }

  static async deleteDoctor(
    id: number
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase.from("doctors").delete().eq("id", id);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Doctor deleted successfully" };
  }
}

export default DoctorClass;
