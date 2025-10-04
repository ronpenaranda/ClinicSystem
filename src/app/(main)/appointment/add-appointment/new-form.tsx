"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/app-calendar";
import { add_appointment } from "@/action/appointment-add.action";
import { Loader2 } from "lucide-react";
import type { Appointment } from "@/model/appointment.model";
import { useActionHandler } from "@/hooks/useActionHandler";
import { SCHEDULE_DAILY } from "@/lib/constant";

const Form = () => {
  const { execute, isPending } = useActionHandler(add_appointment);
  const [form, setForm] = useState<Appointment>({
    patient_uid: 100000011,
    doctor_id: 4000000001,
    appointment_date: "2025-08-10",
    start_time: "09:30:00",
    end_time: "10:00:00",
    status: "Scheduled",
    remarks: "",
    created_at: "2025-08-09 14:15:27.958513+00",
    updated_at: "2025-08-09 14:15:27.958513+00",
  });

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleSubmit = async (formData: Appointment) => {
    await execute({ ...formData, start_time: selectedTime ?? form.start_time });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Book an Appointment
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-6 space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter your address" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="Enter your email" />
              </div>
            </div>

            <div className="col-span-6 flex gap-6">
              <div className="w-1/2">
                <Label>Select Date</Label>
                <Calendar />
              </div>
              <div className="w-1/2">
                <Label>Available Slots</Label>
                <div className="flex flex-col gap-2 pr-2">
                  {SCHEDULE_DAILY.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedTime(item)}
                      className={`flex items-center justify-center rounded-lg border px-3 py-2 text-sm transition ${
                        selectedTime === item
                          ? "bg-blue-600 text-white border-blue-600"
                          : "hover:bg-muted"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex justify-end w-full">
            <Button
              onClick={() => handleSubmit(form)}
              disabled={isPending || !selectedTime}
            >
              {isPending ? (
                <div className="flex gap-2 items-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </div>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Form;
