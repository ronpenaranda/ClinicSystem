-- ClinicSystem PostgreSQL restore script
-- Generated from the current Supabase-backed TypeScript models

BEGIN;

-- Clean up in dependency order
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS treatment_details CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS doctors_schedule CASCADE;
DROP TABLE IF EXISTS patient_details CASCADE;
DROP TABLE IF EXISTS doctors CASCADE;

-- Doctors
CREATE TABLE doctors (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  contact_number TEXT,
  email TEXT,
  license_number TEXT NOT NULL UNIQUE,
  hire_date DATE,
  notes TEXT
);

-- Patients
CREATE TABLE patient_details (
  uid BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  address TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
  phone_number TEXT NOT NULL,
  email_address TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  remarks TEXT
);

-- Doctors schedule
CREATE TABLE doctors_schedule (
  id BIGSERIAL PRIMARY KEY,
  doctor_id BIGINT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  notes TEXT
);

CREATE INDEX idx_doctors_schedule_doctor_id ON doctors_schedule (doctor_id);

-- Appointments
CREATE TABLE appointments (
  id BIGSERIAL PRIMARY KEY,
  patient_uid BIGINT NOT NULL REFERENCES patient_details(uid) ON DELETE CASCADE,
  doctor_id BIGINT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  patient_name TEXT,
  doctor_name TEXT,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  remarks TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_appointments_patient_uid ON appointments (patient_uid);
CREATE INDEX idx_appointments_doctor_id ON appointments (doctor_id);
CREATE INDEX idx_appointments_appointment_date ON appointments (appointment_date);

-- Treatment details
CREATE TABLE treatment_details (
  id BIGSERIAL PRIMARY KEY,
  uid BIGINT NOT NULL REFERENCES patient_details(uid) ON DELETE CASCADE,
  doctor_id BIGINT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  treatment TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  mode_of_payment TEXT NOT NULL
);

CREATE INDEX idx_treatment_details_uid ON treatment_details (uid);
CREATE INDEX idx_treatment_details_doctor_id ON treatment_details (doctor_id);

-- Payments
CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  treatment_id BIGINT NOT NULL REFERENCES treatment_details(id) ON DELETE CASCADE,
  treatment TEXT NOT NULL,
  uid BIGINT NOT NULL REFERENCES patient_details(uid) ON DELETE CASCADE,
  payment_date DATE NOT NULL,
  amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  payment_method TEXT,
  note TEXT
);

CREATE INDEX idx_payments_treatment_id ON payments (treatment_id);
CREATE INDEX idx_payments_uid ON payments (uid);
CREATE INDEX idx_payments_payment_date ON payments (payment_date);

-- Updated_at trigger helper for appointments
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_appointments_updated_at ON appointments;
CREATE TRIGGER trg_appointments_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

COMMIT;
