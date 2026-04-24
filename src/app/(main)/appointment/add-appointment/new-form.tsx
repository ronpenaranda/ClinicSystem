"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { add_appointment } from "@/action/appointment-add.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionHandler } from "@/hooks/useActionHandler";
import { SCHEDULE_DAILY } from "@/lib/constant";
import type { Appointment } from "@/model/appointment.model";

type BookingFormState = {
  patient_uid: string;
  doctor_id: string;
  appointment_date: string;
  status: string;
  remarks: string;
};

const getTodayValue = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const addMinutes = (time: string, minutes: number) => {
  const [hours, mins] = time.split(":").map(Number);
  const next = new Date();
  next.setHours(hours, mins + minutes, 0, 0);

  const formattedHours = String(next.getHours()).padStart(2, "0");
  const formattedMinutes = String(next.getMinutes()).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:00`;
};

const formatSlotLabel = (time: string) => {
  const endTime = addMinutes(time, 30).slice(0, 5);
  return `${time} - ${endTime}`;
};

const Form = () => {
  const { execute, isPending } = useActionHandler(add_appointment);

  const [form, setForm] = useState<BookingFormState>({
    patient_uid: "",
    doctor_id: "",
    appointment_date: getTodayValue(),
    status: "Scheduled",
    remarks: "",
  });
  const [selectedTime, setSelectedTime] = useState<string>(SCHEDULE_DAILY[0]);
  const [error, setError] = useState<string | null>(null);

  const endTime = addMinutes(selectedTime, 30);
  const canSubmit =
    form.patient_uid.trim() !== "" &&
    form.doctor_id.trim() !== "" &&
    form.appointment_date.trim() !== "" &&
    selectedTime.trim() !== "" &&
    !isPending;

  const updateForm = (field: keyof BookingFormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setError(null);

    const patientUid = Number(form.patient_uid);
    const doctorId = Number(form.doctor_id);

    if (!Number.isFinite(patientUid) || !Number.isFinite(doctorId)) {
      setError("Patient UID and Doctor ID must be valid numbers.");
      return;
    }

    if (!form.appointment_date) {
      setError("Appointment date is required.");
      return;
    }

    const payload: Appointment = {
      patient_uid: patientUid,
      doctor_id: doctorId,
      appointment_date: form.appointment_date,
      start_time: `${selectedTime}:00`,
      end_time: endTime,
      status: form.status,
      remarks: form.remarks,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const response = await execute(payload);

    if (response) {
      toast.success("Appointment submitted successfully.");
    } else {
      setError("Unable to submit the appointment. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-full h-full pb-4">
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-gradient-to-r from-slate-50 via-white to-slate-50 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Appointment scheduling
              </p>
              <CardTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Book a new appointment
              </CardTitle>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Fill in the patient and doctor IDs, pick a date and time slot,
                then send the booking to the appointment system.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              30-minute booking slots
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 py-6 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.85fr]">
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="patient_uid">Patient UID</Label>
                  <Input
                    id="patient_uid"
                    type="number"
                    inputMode="numeric"
                    placeholder="Enter patient UID"
                    value={form.patient_uid}
                    onChange={(event) =>
                      updateForm("patient_uid", event.target.value)
                    }
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor_id">Doctor ID</Label>
                  <Input
                    id="doctor_id"
                    type="number"
                    inputMode="numeric"
                    placeholder="Enter doctor ID"
                    value={form.doctor_id}
                    onChange={(event) =>
                      updateForm("doctor_id", event.target.value)
                    }
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointment_date">Appointment Date</Label>
                  <Input
                    id="appointment_date"
                    type="date"
                    value={form.appointment_date}
                    onChange={(event) =>
                      updateForm("appointment_date", event.target.value)
                    }
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={form.status}
                    onChange={(event) =>
                      updateForm("status", event.target.value)
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="rounded-2xl border bg-muted/30 p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Loader2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold sm:text-base">
                      Choose a time slot
                    </h3>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      Select a 30-minute window for the appointment.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {SCHEDULE_DAILY.map((item) => {
                    const selected = selectedTime === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setSelectedTime(item)}
                        aria-pressed={selected}
                        className={[
                          "rounded-xl border px-3 py-3 text-left text-sm font-medium transition-all",
                          selected
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-muted/60",
                        ].join(" ")}
                      >
                        <div>{item}</div>
                        <div
                          className={[
                            "mt-1 text-xs",
                            selected
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground",
                          ].join(" ")}
                        >
                          {formatSlotLabel(item)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <textarea
                  id="remarks"
                  placeholder="Add notes, concerns, or special instructions"
                  value={form.remarks}
                  onChange={(event) =>
                    updateForm("remarks", event.target.value)
                  }
                  className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border bg-background p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-foreground">
                  Booking summary
                </h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-muted-foreground">Patient UID</span>
                    <span className="font-medium">
                      {form.patient_uid || "—"}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-muted-foreground">Doctor ID</span>
                    <span className="font-medium">{form.doctor_id || "—"}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">
                      {form.appointment_date || "—"}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">
                      {selectedTime} –{" "}
                      {addMinutes(selectedTime, 30).slice(0, 5)}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">{form.status}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed bg-muted/20 p-5">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-sky-500" />
                  Submission details
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>
                    • Appointment start time will follow the selected slot.
                  </li>
                  <li>• End time is auto-calculated as a 30-minute window.</li>
                  <li>
                    • Status and remarks are sent with the booking payload.
                  </li>
                </ul>
              </div>

              {error ? (
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
                  {error}
                </div>
              ) : null}
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t bg-muted/20 px-6 py-5 sm:px-8">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Review the IDs and selected slot before confirming the booking.
            </p>

            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full sm:w-auto"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Create Appointment"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Form;
