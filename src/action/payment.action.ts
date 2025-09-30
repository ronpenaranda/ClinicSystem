"use server";

import PaymentsClass, { Payment } from "@/model/payment.model";
import { requireAuth } from "@/lib/req-auth";

export const fetch_payments_by_treatment = async (
  treatment_id: number
): Promise<Payment[]> => {
  try {
    const res = await PaymentsClass.getPaymentsByTreatment(treatment_id);
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

export const fetch_payments_by_patient = async (
  uid: number
): Promise<Payment[]> => {
  try {
    const res = await PaymentsClass.getPaymentsByPatient(uid);
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

export const insert_payment = async (payment: Omit<Payment, "id">) => {
  return await PaymentsClass.addPayment(payment);
};

export const update_payment = async (
  id: number,
  updates: Partial<Omit<Payment, "id">>
) => {
  return await PaymentsClass.updatePayment(id, updates);
};

export const delete_payment = async (id: number) => {
  const { authorized } = await requireAuth();

  return authorized
    ? await PaymentsClass.deletePayment(id)
    : { success: false, message: "Not authorized" };
};
