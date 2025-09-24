"use client";
import { useEffect, useState } from "react";
import supabase from "@/db/supabase";
import type { Appointment } from "@/model/appointment.model";

export function useLiveAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchAppointments() {
      setLoading(true);
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("appointment_date", { ascending: true });

      if (isMounted) {
        if (error) {
          setError(error.message);
        } else {
          setAppointments(data || []);
          setError(null);
        }
        setLoading(false);
      }
    }

    fetchAppointments();

    const channel = supabase
      .channel("public:appointments")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        (payload) => {
          setAppointments((current) => {
            const newAppointment = payload.new as Appointment | null;
            const oldAppointment = payload.old as Appointment | null;

            switch (payload.eventType) {
              case "INSERT":
                if (!newAppointment) return current;
                return [...current, newAppointment].sort(
                  (a, b) =>
                    new Date(a.appointment_date).getTime() -
                    new Date(b.appointment_date).getTime()
                );

              case "UPDATE":
                if (!newAppointment) return current;
                return current
                  .map((appt) =>
                    appt.id === newAppointment.id ? newAppointment : appt
                  )
                  .sort(
                    (a, b) =>
                      new Date(a.appointment_date).getTime() -
                      new Date(b.appointment_date).getTime()
                  );

              case "DELETE":
                if (!oldAppointment) return current;
                return current.filter((appt) => appt.id !== oldAppointment.id);

              default:
                return current;
            }
          });
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { appointments, loading, error };
}
