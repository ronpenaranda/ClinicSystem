"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
} from "lucide-react";

import { useLiveAppointments } from "@/hooks/useLiveAppointments";
import type { Appointment } from "@/model/appointment.model";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeAppointmentDate(dateValue: string) {
  return dateValue.slice(0, 10);
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatDayLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(date);
}

function getMonthGrid(date: Date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const totalDays = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();

  return {
    startOffset,
    totalDays,
  };
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function sortByStartTime(a: Appointment, b: Appointment) {
  return a.start_time.localeCompare(b.start_time);
}

export default function AppointmentCalendar() {
  const { appointments, loading, error } = useLiveAppointments();
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const monthLabel = formatMonthLabel(visibleMonth);
  const selectedDateLabel = formatDayLabel(selectedDate);
  const selectedDateKey = toDateKey(selectedDate);

  const { startOffset, totalDays } = useMemo(
    () => getMonthGrid(visibleMonth),
    [visibleMonth],
  );

  const appointmentsByDate = useMemo(() => {
    const map = new Map<string, Appointment[]>();

    for (const appointment of appointments) {
      const key = normalizeAppointmentDate(appointment.appointment_date);
      const current = map.get(key) ?? [];
      current.push(appointment);
      map.set(key, current);
    }

    for (const [key, items] of map.entries()) {
      map.set(key, items.sort(sortByStartTime));
    }

    return map;
  }, [appointments]);

  const selectedDayAppointments = useMemo(() => {
    return (appointmentsByDate.get(selectedDateKey) ?? []).sort(
      sortByStartTime,
    );
  }, [appointmentsByDate, selectedDateKey]);

  const changeMonth = (direction: -1 | 1) => {
    setVisibleMonth((current) => {
      const next = new Date(current);
      next.setMonth(current.getMonth() + direction);

      setSelectedDate((currentSelected) => {
        const updated = new Date(next);
        const day = currentSelected.getDate();
        const maxDay = new Date(
          next.getFullYear(),
          next.getMonth() + 1,
          0,
        ).getDate();
        updated.setDate(Math.min(day, maxDay));
        return updated;
      });

      return next;
    });
  };

  const jumpToToday = () => {
    const today = new Date();
    setVisibleMonth(today);
    setSelectedDate(today);
  };

  const renderDayCell = (dayNumber: number) => {
    const cellDate = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth(),
      dayNumber,
    );
    const cellKey = toDateKey(cellDate);
    const isSelected = isSameDay(cellDate, selectedDate);
    const hasAppointments = appointmentsByDate.has(cellKey);
    const isToday = isSameDay(cellDate, new Date());

    return (
      <button
        key={cellKey}
        type="button"
        onClick={() => setSelectedDate(cellDate)}
        className={[
          "relative flex h-12 flex-col items-center justify-center rounded-md border text-sm transition-colors",
          isSelected
            ? "border-primary bg-primary text-primary-foreground shadow-sm"
            : "border-transparent bg-muted/40 hover:border-border hover:bg-muted",
          isToday && !isSelected ? "ring-1 ring-primary/40" : "",
        ].join(" ")}
      >
        <span className="font-medium">{dayNumber}</span>
        <span
          className={[
            "mt-1 h-1.5 w-1.5 rounded-full",
            hasAppointments
              ? isSelected
                ? "bg-primary-foreground"
                : "bg-primary"
              : "bg-transparent",
          ].join(" ")}
        />
      </button>
    );
  };

  const emptyCells = Array.from({ length: startOffset }, (_, index) => (
    <div key={`empty-${index}`} className="h-12 rounded-md" />
  ));

  const loadingState = loading && appointments.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Appointment calendar</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            View appointments by date
          </h1>
        </div>
        <Button variant="outline" size="sm" onClick={jumpToToday}>
          Today
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] max-h-screen">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b px-4 py-4">
            <div>
              <CardTitle className="text-base">{monthLabel}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Select a day to see all appointments.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => changeMonth(-1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => changeMonth(1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <div className="mb-3 grid grid-cols-7 gap-2 text-center text-xs font-medium text-muted-foreground">
              {weekdayLabels.map((day) => (
                <div key={day} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {emptyCells}
              {Array.from({ length: totalDays }, (_, index) =>
                renderDayCell(index + 1),
              )}
            </div>

            {error ? (
              <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="border-b px-4 py-4">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {selectedDateLabel}
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {selectedDayAppointments.length} appointment
              {selectedDayAppointments.length === 1 ? "" : "s"} scheduled.
            </p>
          </CardHeader>

          <CardContent className="space-y-3 p-4 h-full">
            {loadingState ? (
              <div className="space-y-3">
                <div className="h-20 rounded-lg bg-muted/40" />
                <div className="h-20 rounded-lg bg-muted/40" />
                <div className="h-20 rounded-lg bg-muted/40" />
              </div>
            ) : selectedDayAppointments.length === 0 ? (
              <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed bg-muted/20 px-4 py-10 text-center">
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    No appointments for this day
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pick another date or create a new appointment.
                  </p>
                </div>
              </div>
            ) : (
              selectedDayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-lg border bg-background p-4 shadow-sm transition-colors hover:bg-muted/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">
                          {appointment.patient_name ?? "Unknown patient"}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span className="rounded-full bg-muted px-2 py-1">
                          Doctor: {appointment.doctor_name ?? "Unknown"}
                        </span>
                        <span className="rounded-full bg-muted px-2 py-1">
                          Status: {appointment.status || "Pending"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.start_time}</span>
                    </div>
                  </div>

                  {appointment.remarks ? (
                    <p className="mt-3 text-sm text-muted-foreground">
                      {appointment.remarks}
                    </p>
                  ) : null}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
