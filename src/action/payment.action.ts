"use server";

import PaymentsClass, { Payment } from "@/model/payment.model";

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
  return await PaymentsClass.deletePayment(id);
};
