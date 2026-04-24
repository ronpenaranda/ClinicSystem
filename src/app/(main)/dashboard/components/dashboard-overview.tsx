"use client";

import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import { useRouter } from "next/navigation";
import { Activity, CalendarDays, Plus, User } from "lucide-react";

import { useLiveAppointments } from "@/hooks/useLiveAppointments";
import type { Appointment } from "@/model/appointment.model";
import FlashCard from "./flash-cards";
import { ChartBarMultiple } from "./chart";
import CalendarCard from "./calendar";
import { Button } from "@/components/ui/button";

type AppointmentChartPoint = {
  month: string;
  appointments: number;
};

type DashboardCardValues = {
  patientsToday: number;
  appointments: number;
  activeDoctors: number;
};

type DashboardChartProps = {
  chartData: AppointmentChartPoint[];
  chartRangeLabel: string;
  totalAppointments: number;
};

type DashboardCalendarProps = {
  appointments: Appointment[];
  selectedDate: Date;
  onSelectedDateChange: (date: Date) => void;
  visibleMonth: Date;
  onVisibleMonthChange: (date: Date) => void;
  selectedDateAppointments: Appointment[];
};

const CHART_MONTH_COUNT = 6;

function normalizeDateKey(value: string) {
  return value.slice(0, 10);
}

function getLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}`;
}

function getMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function getMonthRangeLabel(start: Date, end: Date) {
  return `${getMonthLabel(start)} - ${getMonthLabel(end)}`;
}

function sortByTime(a: Appointment, b: Appointment) {
  return a.start_time.localeCompare(b.start_time);
}

function buildChartSeries(appointments: Appointment[]) {
  const monthCounts = new Map<string, number>();

  appointments.forEach((appointment) => {
    const monthKey = getMonthKey(new Date(appointment.appointment_date));
    monthCounts.set(monthKey, (monthCounts.get(monthKey) ?? 0) + 1);
  });

  const today = new Date();
  const startMonth = new Date(
    today.getFullYear(),
    today.getMonth() - CHART_MONTH_COUNT + 1,
    1,
  );

  return Array.from({ length: CHART_MONTH_COUNT }, (_, index) => {
    const monthDate = new Date(
      startMonth.getFullYear(),
      startMonth.getMonth() + index,
      1,
    );
    const key = getMonthKey(monthDate);

    return {
      month: getMonthLabel(monthDate),
      appointments: monthCounts.get(key) ?? 0,
    };
  });
}

function getCardValues(
  appointments: Appointment[],
  selectedDate: Date,
): DashboardCardValues {
  const selectedDateKey = getLocalDateKey(selectedDate);
  const todayAppointments = appointments.filter(
    (appointment) =>
      normalizeDateKey(appointment.appointment_date) === selectedDateKey,
  );

  return {
    patientsToday: new Set(
      todayAppointments.map((appointment) => appointment.patient_uid),
    ).size,
    appointments: appointments.length,
    activeDoctors: new Set(
      appointments.map((appointment) => appointment.doctor_id),
    ).size,
  };
}

export default function DashboardOverview() {
  const router = useRouter();
  const { appointments, loading, error } = useLiveAppointments();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());

  const chartData = useMemo(
    () => buildChartSeries(appointments),
    [appointments],
  );

  const selectedDateAppointments = useMemo(() => {
    const selectedKey = getLocalDateKey(selectedDate);

    return appointments
      .filter(
        (appointment) =>
          normalizeDateKey(appointment.appointment_date) === selectedKey,
      )
      .sort(sortByTime);
  }, [appointments, selectedDate]);

  const cardValues = useMemo(
    () => getCardValues(appointments, selectedDate),
    [appointments, selectedDate],
  );

  const chartRangeLabel = useMemo(() => {
    if (chartData.length === 0) {
      return "";
    }

    const start = new Date();
    start.setMonth(start.getMonth() - CHART_MONTH_COUNT + 1);
    const end = new Date();

    return getMonthRangeLabel(start, end);
  }, [chartData.length]);

  const DashboardChart =
    ChartBarMultiple as unknown as ComponentType<DashboardChartProps>;
  const DashboardCalendar =
    CalendarCard as unknown as ComponentType<DashboardCalendarProps>;

  const handleBookAppointment = () => {
    router.push("/appointment/add-appointment");
  };

  const handleAddPatient = () => {
    router.push("/patient-management/add-patient");
  };

  return (
    <div className="space-y-6 px-6 py-6 md:px-16">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Dashboard overview</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Live appointment activity
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            className="flex items-center gap-2"
            onClick={handleBookAppointment}
          >
            <Plus className="h-4 w-4" />
            Book Appointment
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleAddPatient}
          >
            <Plus className="h-4 w-4" />
            Add Patient
          </Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <FlashCard
              icon={User}
              title="Patients Today"
              value={cardValues.patientsToday}
              iconColor="text-red-500"
              bgColor="bg-red-100"
            />
            <FlashCard
              icon={CalendarDays}
              title="Appointments"
              value={cardValues.appointments}
              iconColor="text-green-500"
              bgColor="bg-green-100"
            />
            <FlashCard
              icon={Activity}
              title="Active Doctors"
              value={cardValues.activeDoctors}
              iconColor="text-blue-500"
              bgColor="bg-blue-100"
            />
          </div>

          <DashboardChart
            chartData={chartData}
            chartRangeLabel={chartRangeLabel}
            totalAppointments={appointments.length}
          />
        </div>

        <DashboardCalendar
          appointments={appointments}
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
          visibleMonth={visibleMonth}
          onVisibleMonthChange={setVisibleMonth}
          selectedDateAppointments={selectedDateAppointments}
        />
      </div>

      {loading && appointments.length === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="h-24 rounded-xl bg-muted/40 animate-pulse" />
          <div className="h-24 rounded-xl bg-muted/40 animate-pulse" />
          <div className="h-24 rounded-xl bg-muted/40 animate-pulse" />
        </div>
      ) : null}
    </div>
  );
}
