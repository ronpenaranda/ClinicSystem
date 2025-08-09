'use server';

import { mssqlConnection } from "@/db/mssql";
import { IResult } from "mssql";

export interface TreatmentDetails {
  id: number;
  uid: number;
  treatment: string;
  notes: string;
  amount: number;
  mode_of_payment: string;
}

class TreatmentClass {
  static async getAllTreatment(): Promise<TreatmentDetails[] | { error: string }> {
    try {
      const pool = await mssqlConnection();
      const result: IResult<TreatmentDetails> = await pool
        .request()
        .query<TreatmentDetails>("SELECT * FROM treatment_details");
      return result.recordset;
    } catch (err: any) {
      return { error: err.message };
    }
  }


  static async getTreatmentByUid(uid: number): Promise<TreatmentDetails[] | { error: string }> {
    try {
      const pool = await mssqlConnection();
      const result: IResult<TreatmentDetails> = await pool
        .request()
        .input("uid", uid)
        .query<TreatmentDetails>("SELECT * FROM treatment_details WHERE uid = @uid");
      return result.recordset;
    } catch (err: any) {
      return { error: err.message };
    }
  }

  static async addTreatment(
    treatment: Omit<TreatmentDetails, "id">
  ): Promise<{ success: boolean; message: string }> {
    try {
      const pool = await mssqlConnection();
      await pool
        .request()
        .input("uid", treatment.uid)
        .input("treatment", treatment.treatment)
        .input("notes", treatment.notes)
        .input("amount", treatment.amount)
        .input("mode_of_payment", treatment.mode_of_payment)
        .query(
          `INSERT INTO treatment_details (uid, treatment, notes, amount, mode_of_payment)
           VALUES (@uid, @treatment, @notes, @amount, @mode_of_payment)`
        );

      return { success: true, message: "Treatment added successfully" };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  }

  static async updateTreatment(
    id: number,
    updates: Partial<Omit<TreatmentDetails, "id">>
  ): Promise<{ success: boolean; message: string }> {
    try {
      const pool = await mssqlConnection();
      await pool
        .request()
        .input("id", id)
        .input("uid", updates.uid ?? null)
        .input("treatment", updates.treatment ?? null)
        .input("notes", updates.notes ?? null)
        .input("amount", updates.amount ?? null)
        .input("mode_of_payment", updates.mode_of_payment ?? null)
        .query(
          `UPDATE treatment_details
           SET uid = ISNULL(@uid, uid),
               treatment = ISNULL(@treatment, treatment),
               notes = ISNULL(@notes, notes),
               amount = ISNULL(@amount, amount),
               mode_of_payment = ISNULL(@mode_of_payment, mode_of_payment)
           WHERE id = @id`
        );

      return { success: true, message: "Treatment updated successfully" };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  }

  static async deleteTreatment(id: number): Promise<{ success: boolean; message: string }> {
    try {
      const pool = await mssqlConnection();
      await pool
        .request()
        .input("id", id)
        .query(`DELETE FROM treatment_details WHERE id = @id`);

      return { success: true, message: "Treatment deleted successfully" };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  }
}

export default TreatmentClass;
