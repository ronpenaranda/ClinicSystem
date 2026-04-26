"use server";

import { insert_payment } from "@/action/payment.action";
import type { Payment } from "@/model/payment.model";
import TreatmentClass, { TreatmentDetails } from "@/model/treatment.model";

export type TreatmentPaymentResult =
  | {
      success: true;
      message: string;
      treatment: TreatmentDetails;
      payment: Payment;
    }
  | {
      success: false;
      message: string;
    };

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
  doctorId: number,
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
  treatment: Omit<TreatmentDetails, "id">,
) => {
  return await TreatmentClass.addTreatment(treatment);
};

export const insert_treatment_with_payment = async (
  treatment: Omit<TreatmentDetails, "id">,
): Promise<TreatmentPaymentResult> => {
  try {
    const treatmentResult = await insert_treatment(treatment);

    if (!treatmentResult || "error" in treatmentResult) {
      return {
        success: false,
        message:
          "Unable to create treatment. Please verify the treatment details.",
      };
    }

    if (typeof treatmentResult.id !== "number") {
      return {
        success: false,
        message: "Treatment was created but its identifier is missing.",
      };
    }

    const paymentPayload: Omit<Payment, "id"> = {
      treatment_id: treatmentResult.id,
      treatment: treatmentResult.treatment,
      uid: treatmentResult.uid,
      payment_date: new Date().toISOString(),
      amount: treatmentResult.amount,
      payment_method: treatmentResult.mode_of_payment,
      note: treatmentResult.notes,
    };

    const paymentResult = await insert_payment(paymentPayload);

    if (!paymentResult || "error" in paymentResult) {
      await delete_treatment(treatmentResult.id);
      return {
        success: false,
        message:
          "Treatment was saved, but the payment could not be created. The treatment was rolled back.",
      };
    }

    return {
      success: true,
      message: "Treatment and payment added successfully.",
      treatment: treatmentResult,
      payment: paymentResult,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Unable to create treatment and payment.",
    };
  }
};

export const update_treatment = async (
  id: number,
  updates: Partial<Omit<TreatmentDetails, "id">>,
) => {
  return await TreatmentClass.updateTreatment(id, updates);
};

export const delete_treatment = async (id: number) => {
  return await TreatmentClass.deleteTreatment(id);
};
