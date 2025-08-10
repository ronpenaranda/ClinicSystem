import supabase from "@/db/supabase";

export interface DoctorSchedule {
  id?: number;
  doctor_id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  notes?: string;
}

export class DoctorScheduleClass {
  static async getAllSchedules(): Promise<
    DoctorSchedule[] | { error: string }
  > {
    const { data, error } = await supabase.from("doctors_schedule").select("*");
    if (error) return { error: error.message };
    return data as DoctorSchedule[];
  }

  static async getSchedulesByDoctorId(
    doctorId: number
  ): Promise<DoctorSchedule[] | { error: string }> {
    const { data, error } = await supabase
      .from("doctors_schedule")
      .select("*")
      .eq("doctor_id", doctorId);
    if (error) return { error: error.message };
    return data as DoctorSchedule[];
  }

  static async createSchedule(
    schedule: DoctorSchedule
  ): Promise<DoctorSchedule | { error: string }> {
    const { data, error } = await supabase
      .from("doctors_schedule")
      .insert([schedule])
      .select()
      .single();
    if (error) return { error: error.message };
    return data as DoctorSchedule;
  }

  static async updateSchedule(
    id: number,
    updates: Partial<DoctorSchedule>
  ): Promise<DoctorSchedule | { error: string }> {
    const { data, error } = await supabase
      .from("doctors_schedule")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) return { error: error.message };
    return data as DoctorSchedule;
  }

  static async deleteSchedule(
    id: number
  ): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase
      .from("doctors_schedule")
      .delete()
      .eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  }
}
