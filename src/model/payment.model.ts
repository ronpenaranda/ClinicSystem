"use server";

import supabase from "@/db/supabase";

export interface Payment {
  id?: number;
  treatment_id: number;
  treatment: string;
  uid: number;
  payment_date: string;
  amount: number;
  payment_method?: string;
  note?: string;
}

class PaymentsClass {
  static async addPayment(
    payment: Omit<Payment, "id">
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase.from("payments").insert([{ ...payment }]);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Payment added successfully" };
  }

  static async getPaymentsByTreatment(
    treatment_id: number
  ): Promise<Payment[] | { error: string }> {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("treatment_id", treatment_id)
      .order("payment_date", { ascending: true });
    if (error) return { error: error.message };
    return data as Payment[];
  }

  static async getPaymentsByPatient(
    uid: number
  ): Promise<Payment[] | { error: string }> {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("uid", uid)
      .order("payment_date", { ascending: true });
    if (error) return { error: error.message };
    return data as Payment[];
  }

  static async deletePayment(
    id: number
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase.from("payments").delete().eq("id", id);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Payment deleted successfully" };
  }

  static async updatePayment(
    id: number,
    payment: Partial<Omit<Payment, "id">>
  ): Promise<{ success: boolean; message: string }> {
    const { error } = await supabase
      .from("payments")
      .update(payment)
      .eq("id", id);
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Payment updated successfully" };
  }
}

export default PaymentsClass;
