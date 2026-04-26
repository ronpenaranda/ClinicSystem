"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

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
  const router = useRouter();
  const { appointments, loading, error } = useLiveAppointments();
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());

  const monthLabel = formatMonthLabel(visibleMonth);

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

  const changeMonth = (direction: -1 | 1) => {
    setVisibleMonth((current) => {
      const next = new Date(current);
      next.setMonth(current.getMonth() + direction);
      return next;
    });
  };

  const jumpToToday = () => {
    setVisibleMonth(new Date());
  };

  const openDay = (cellDate: Date) => {
    router.push(`/appointment/${toDateKey(cellDate)}`);
  };

  const renderDayCell = (dayNumber: number) => {
    const cellDate = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth(),
      dayNumber,
    );
    const cellKey = toDateKey(cellDate);
    const hasAppointments = appointmentsByDate.has(cellKey);
    const appointmentCount = appointmentsByDate.get(cellKey)?.length ?? 0;
    const isToday = isSameDay(cellDate, new Date());

    return (
      <button
        key={cellKey}
        type="button"
        onClick={() => openDay(cellDate)}
        aria-label={`Manage appointments for ${cellKey}`}
        title={`Open ${cellKey}`}
        className={[
          "group relative flex min-h-28 flex-col justify-between rounded-2xl border p-3 text-left transition-all md:min-h-32",
          hasAppointments
            ? "border-primary/25 bg-primary/5 hover:border-primary/40 hover:bg-primary/10"
            : "border-border/70 bg-background hover:border-primary/30 hover:bg-muted/40",
          isToday
            ? "ring-1 ring-primary/30 ring-offset-2 ring-offset-background"
            : "",
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-base font-semibold leading-none text-foreground md:text-lg">
              {dayNumber}
            </span>
            {isToday ? (
              <span className="inline-flex rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
                Today
              </span>
            ) : null}
          </div>

          {hasAppointments ? (
            <span className="rounded-full bg-primary px-2 py-1 text-[11px] font-medium text-primary-foreground shadow-sm">
              {appointmentCount} {appointmentCount === 1 ? "appt" : "appts"}
            </span>
          ) : (
            <span className="rounded-full border border-dashed border-muted-foreground/30 px-2 py-1 text-[11px] text-muted-foreground">
              Open
            </span>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            {Array.from(
              { length: Math.min(3, appointmentCount || 0) },
              (_, index) => (
                <span
                  key={`${cellKey}-dot-${index}`}
                  className="h-2 w-2 rounded-full bg-primary"
                />
              ),
            )}
          </div>
          <p
            className={[
              "text-xs leading-5 transition-colors",
              hasAppointments
                ? "text-foreground/80 group-hover:text-foreground"
                : "text-muted-foreground",
            ].join(" ")}
          >
            {hasAppointments
              ? "Click to manage patient appointments for this day."
              : "Click to create or review appointments for this day."}
          </p>
        </div>
      </button>
    );
  };

  const emptyCells = Array.from({ length: startOffset }, (_, index) => (
    <div
      key={`empty-${index}`}
      className="min-h-28 rounded-2xl border border-dashed border-transparent bg-transparent md:min-h-32"
      aria-hidden="true"
    />
  ));

  const loadingState = loading && appointments.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-primary">
            Appointment calendar
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Manage patient appointments by day
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
            Select any date to open its appointment management page. Use the
            month controls to move through the schedule.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={jumpToToday}>
          Today
        </Button>
      </div>

      <Card className="overflow-hidden border-border/60 shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-slate-50 via-white to-slate-50 px-5 py-5 md:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CalendarDays className="h-5 w-5 text-primary" />
                {monthLabel}
              </CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                Pick a day to manage all appointments for that date.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => changeMonth(1)}
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 p-5 md:p-6">
          <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground md:gap-3">
            {weekdayLabels.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {loadingState ? (
            <div className="grid grid-cols-7 gap-2 md:gap-3">
              {Array.from({ length: 35 }, (_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="min-h-28 animate-pulse rounded-2xl border border-border/60 bg-muted/40 md:min-h-32"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2 md:gap-3">
              {emptyCells}
              {Array.from({ length: totalDays }, (_, index) =>
                renderDayCell(index + 1),
              )}
            </div>
          )}

          {error ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
