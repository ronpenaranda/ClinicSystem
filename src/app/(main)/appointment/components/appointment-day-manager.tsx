"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock3,
  Loader2,
  Plus,
  Trash2,
  User,
} from "lucide-react";

import { delete_appointment } from "@/action/appointment.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionHandler } from "@/hooks/useActionHandler";
import { useLiveAppointments } from "@/hooks/useLiveAppointments";
import type { Appointment } from "@/model/appointment.model";

type AppointmentDayManagerProps = {
  selectedDate: string;
};

function normalizeDateKey(dateValue: string) {
  return dateValue.slice(0, 10);
}

function formatDayLabel(dateValue: string) {
  const date = new Date(`${normalizeDateKey(dateValue)}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function sortByStartTime(a: Appointment, b: Appointment) {
  return a.start_time.localeCompare(b.start_time);
}

function formatTimeRange(startTime: string, endTime?: string) {
  const start = startTime.slice(0, 5);
  const end = endTime ? endTime.slice(0, 5) : "";

  return end ? `${start} - ${end}` : start;
}

function getAppointmentStatusTone(status: string) {
  const normalized = status.toLowerCase();

  if (normalized.includes("confirm")) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (normalized.includes("complete")) {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (normalized.includes("cancel")) {
    return "border-destructive/20 bg-destructive/5 text-destructive";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

export default function AppointmentDayManager({
  selectedDate,
}: AppointmentDayManagerProps) {
  const router = useRouter();
  const { appointments, loading, error } = useLiveAppointments();
  const { execute, isPending } = useActionHandler(delete_appointment);

  const normalizedSelectedDate = normalizeDateKey(selectedDate);
  const selectedDayLabel = formatDayLabel(selectedDate);

  const selectedDayAppointments = useMemo(() => {
    return appointments
      .filter(
        (appointment) =>
          normalizeDateKey(appointment.appointment_date) ===
          normalizedSelectedDate,
      )
      .sort(sortByStartTime);
  }, [appointments, normalizedSelectedDate]);

  const handleDelete = async (appointmentId?: number) => {
    if (appointmentId === undefined) {
      return;
    }

    await execute(appointmentId);
  };

  const goBackToCalendar = () => {
    router.push("/appointment");
  };

  const bookNewAppointment = () => {
    router.push("/appointment/add-appointment");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-primary">
            Appointment management
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {selectedDayLabel}
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
            Review, update, and remove patient appointments for this selected
            day.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={goBackToCalendar}>
            Back to calendar
          </Button>
          <Button onClick={bookNewAppointment}>
            <Plus className="mr-2 h-4 w-4" />
            Book appointment
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-border/60 shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-slate-50 via-white to-slate-50 px-5 py-5 md:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <CalendarDays className="h-5 w-5 text-primary" />
              Daily appointments
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {selectedDayAppointments.length} appointment
              {selectedDayAppointments.length === 1 ? "" : "s"} scheduled
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-5 md:p-6">
          {loading && appointments.length === 0 ? (
            <div className="grid gap-3">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={`loading-${index}`}
                  className="h-28 animate-pulse rounded-2xl border border-border/60 bg-muted/40"
                />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : selectedDayAppointments.length === 0 ? (
            <div className="flex min-h-52 items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 py-10 text-center">
              <div className="space-y-2">
                <p className="text-base font-medium text-foreground">
                  No appointments found for this day
                </p>
                <p className="text-sm text-muted-foreground">
                  Book a new appointment or return to the calendar to choose a
                  different date.
                </p>
                <div className="flex flex-col gap-2 pt-3 sm:flex-row sm:justify-center">
                  <Button variant="outline" onClick={goBackToCalendar}>
                    Back to calendar
                  </Button>
                  <Button onClick={bookNewAppointment}>
                    <Plus className="mr-2 h-4 w-4" />
                    Book appointment
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-3">
              {selectedDayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-2xl border bg-background p-4 shadow-sm transition-colors hover:bg-muted/30"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                          <Clock3 className="h-3.5 w-3.5" />
                          {formatTimeRange(
                            appointment.start_time,
                            appointment.end_time,
                          )}
                        </span>
                        <span
                          className={[
                            "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                            getAppointmentStatusTone(appointment.status),
                          ].join(" ")}
                        >
                          {appointment.status || "Pending"}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {appointment.patient_name ?? "Unknown patient"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <span className="rounded-full bg-muted px-2 py-1">
                            Doctor: {appointment.doctor_name ?? "Unknown"}
                          </span>
                          <span className="rounded-full bg-muted px-2 py-1">
                            Patient UID: {appointment.patient_uid}
                          </span>
                          <span className="rounded-full bg-muted px-2 py-1">
                            Doctor ID: {appointment.doctor_id}
                          </span>
                        </div>
                      </div>

                      {appointment.remarks ? (
                        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                          {appointment.remarks}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No remarks were added for this appointment.
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 lg:self-start">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(appointment.id)}
                        disabled={isPending || appointment.id === undefined}
                        className="gap-2"
                      >
                        {isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
