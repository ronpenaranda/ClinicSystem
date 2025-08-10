// appointment.model.ts
import supabase from "@/db/supabase";

export interface Appointment {
  id?: number;
  patient_uid: number;
  doctor_id: number;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: string;
  remarks?: string;
  created_at?: string;
  updated_at?: string;
}

class AppointmentClass {
  static async getAllAppointments(): Promise<
    Appointment[] | { error: string }
  > {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true });
    if (error) return { error: error.message };
    return data as Appointment[];
  }

  static async getAppointmentById(
    id: number
  ): Promise<Appointment | { error: string }> {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return { error: error.message };
    return data as Appointment;
  }

  static async addAppointment(
    appointment: Omit<Appointment, "id" | "created_at" | "updated_at">
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase
      .from("appointments")
      .insert([{ ...appointment }]);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Appointment added successfully" };
  }

  static async updateAppointment(
    id: number,
    updates: Partial<Omit<Appointment, "id" | "created_at" | "updated_at">>
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase
      .from("appointments")
      .update(updates)
      .eq("id", id);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Appointment updated successfully" };
  }

  static async deleteAppointment(
    id: number
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Appointment deleted successfully" };
  }
}

export default AppointmentClass;
