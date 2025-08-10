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
import { insert_appointment } from "@/action/appointment.action";

import { Loader2 } from "lucide-react";
import type { Appointment } from "@/model/appointment.model";
import { useActionHandler } from "@/hooks/useActionHandler";

const Form = () => {
  const { execute, isPending } = useActionHandler(insert_appointment);
  const [form, setForm] = useState<Appointment>({
    patient_uid: 100000001,
    doctor_id: 4000000001,
    appointment_date: "2025-08-10",
    start_time: "09:30:00",
    end_time: "10:00:00",
    status: "Scheduled",
    remarks: "",
    created_at: "2025-08-09 14:15:27.958513+00",
    updated_at: "2025-08-09 14:15:27.958513+00",
  });

  const handleSubmit = async (formData: Appointment) => {
    await execute(formData);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-6">
            <div className="grid col-span-12 gap-2">
              <Label htmlFor="tabs-demo-name">Name</Label>
              <Input id="tabs-demo-name" defaultValue={""} />
            </div>
            <div className="grid col-span-6 gap-2">
              <Label htmlFor="tabs-demo-name">Address</Label>
              <Input id="tabs-demo-name" defaultValue={""} />
            </div>
            <div className="grid col-span-6 gap-2">
              <Label htmlFor="tabs-demo-username">Phone Number</Label>
              <Input id="tabs-demo-username" defaultValue={""} />
            </div>
            <div className="grid col-span-6 gap-2">
              <Label htmlFor="tabs-demo-username">Email Address</Label>
              <Input id="tabs-demo-username" defaultValue={""} />
            </div>
            <div className="grid col-span-6 gap-2">
              <Label htmlFor="tabs-demo-username">License Number</Label>
              <Input id="tabs-demo-username" defaultValue={""} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end w-full mb-4">
            <Button onClick={() => handleSubmit(form)}>
              {isPending ? (
                <div className="flex gap-2 items-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submiting ...
                </div>
              ) : (
                <div>Submit</div>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Form;
