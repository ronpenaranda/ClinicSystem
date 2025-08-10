"use client";

import { useLiveAppointments } from "@/hooks/useLiveAppointments";

const LiveAppointment = () => {
  const { appointments, loading, error } = useLiveAppointments();

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {appointments.map((appt) => (
        <li key={appt.id}>
          {appt.appointment_date} - Patient #{appt.patient_uid} with Doctor #
          {appt.doctor_id} - Status: {appt.status}
        </li>
      ))}
    </ul>
  );
};
export default LiveAppointment;
