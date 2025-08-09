'use server';

import { mssqlConnection } from "@/db/mssql";
import { IResult } from "mssql";

export interface PatientDetails {
  uid: number;
  first_name: string;
  middle_name?: string; 
  last_name: string;
  address: string; 
  gender: 'Male' | 'Female' | 'Other'; 
  phone_number: string;
  email_address: string;
  created_by: string;
  created_at: string;
  remarks?: string;
}

class PatientClass {
  static async getAllPatient(): Promise<PatientDetails[] | { error: string }> {
    try {
      const pool = await mssqlConnection();
      const result: IResult<PatientDetails> = await pool
        .request()
        .query<PatientDetails>("SELECT * FROM patient_details");
      return result.recordset;
    } catch (err: any) {
      return { error: err.message };
    }
  }

  static async getPatientByUid(uid: string): Promise<PatientDetails[] | { error: string }> {
    try {
      const pool = await mssqlConnection();
      const result: IResult<PatientDetails> = await pool
        .request()
        .input("uid", uid)
        .query<PatientDetails>("SELECT * FROM patient_details WHERE uid = @uid");
      return result.recordset;
    } catch (err: any) {
      return { error: err.message };
    }
  }

  static async addPatient(patient: Omit<PatientDetails, "uid" | "created_at">): Promise<{ success: boolean; message: string }> {
    try {
      const pool = await mssqlConnection();
      await pool.request()
        .input("first_name", patient.first_name)
        .input("middle_name", patient.middle_name || null)
        .input("last_name", patient.last_name)
        .input("address", patient.address)
        .input("gender", patient.gender)
        .input("phone_number", patient.phone_number)
        .input("email_address", patient.email_address)
        .input("created_by", patient.created_by)
        .input("remarks", patient.remarks || null)
        .query(`
          INSERT INTO patient_details 
            (first_name, middle_name, last_name, address, gender, phone_number, email_address, created_by, created_at, remarks)
          VALUES 
            (@first_name, @middle_name, @last_name, @address, @gender, @phone_number, @email_address, @created_by, GETDATE(), @remarks)
        `);
      return { success: true, message: "Patient added successfully" };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  }

  static async updatePatient(uid: number, patient: Partial<Omit<PatientDetails, "uid" | "created_at">>): Promise<{ success: boolean; message: string }> {
    try {
      const pool = await mssqlConnection();
      await pool.request()
        .input("uid", uid)
        .input("first_name", patient.first_name || null)
        .input("middle_name", patient.middle_name || null)
        .input("last_name", patient.last_name || null)
        .input("address", patient.address || null)
        .input("gender", patient.gender || null)
        .input("phone_number", patient.phone_number || null)
        .input("email_address", patient.email_address || null)
        .input("created_by", patient.created_by || null)
        .input("remarks", patient.remarks || null)
        .query(`
          UPDATE patient_details SET
            first_name = COALESCE(@first_name, first_name),
            middle_name = COALESCE(@middle_name, middle_name),
            last_name = COALESCE(@last_name, last_name),
            address = COALESCE(@address, address),
            gender = COALESCE(@gender, gender),
            phone_number = COALESCE(@phone_number, phone_number),
            email_address = COALESCE(@email_address, email_address),
            created_by = COALESCE(@created_by, created_by),
            remarks = COALESCE(@remarks, remarks)
          WHERE uid = @uid
        `);
      return { success: true, message: "Patient updated successfully" };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  }

  static async deletePatient(uid: number): Promise<{ success: boolean; message: string }> {
    try {
      const pool = await mssqlConnection();
      await pool.request()
        .input("uid", uid)
        .query("DELETE FROM patient_details WHERE uid = @uid");
      return { success: true, message: "Patient deleted successfully" };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  }
}

export default PatientClass;
