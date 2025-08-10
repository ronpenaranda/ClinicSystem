"use client";

import React, { useState } from "react";
import type { Doctor } from "@/model/doctor.model";
import type { TreatmentDetails } from "@/model/treatment.model";
import type { DoctorSchedule } from "@/model/doctor-schedule.model";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DynamicTable from "@/components/table/table";

interface PatientProps {
  data: Doctor[];
  treatment: TreatmentDetails[];
  schedule: DoctorSchedule[];
}

const columns = [
  { header: "Doctor", keys: "doctor_id" },
  { header: "Treatment", keys: "treatment" },
  { header: "Notes", keys: "notes" },
  { header: "Amount", keys: "amount" },
];

const columns_schedule = [
  { header: "Doctor", keys: "doctor_id" },
  { header: "Day", keys: "day_of_week" },
  { header: "Start Time", keys: "start_time" },
  { header: "End Time", keys: "end_time" },
  { header: "Available", keys: "is_available" },
  { header: "Notes", keys: "notes" },
];

const PatientDetails = ({ data, treatment, schedule }: PatientProps) => {
  const [form, setForm] = useState<Doctor>(data[0]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-6">
          <div className="grid col-span-12 gap-2">
            <Label htmlFor="tabs-demo-name">Name</Label>
            <Input id="tabs-demo-name" defaultValue={form.name} />
          </div>
          <div className="grid col-span-6 gap-2">
            <Label htmlFor="tabs-demo-name">Address</Label>
            <Input id="tabs-demo-name" defaultValue={form.specialization} />
          </div>
          <div className="grid col-span-6 gap-2">
            <Label htmlFor="tabs-demo-username">Phone Number</Label>
            <Input id="tabs-demo-username" defaultValue={form.contact_number} />
          </div>
          <div className="grid col-span-6 gap-2">
            <Label htmlFor="tabs-demo-username">Email Address</Label>
            <Input id="tabs-demo-username" defaultValue={form.email} />
          </div>
          <div className="grid col-span-6 gap-2">
            <Label htmlFor="tabs-demo-username">License Number</Label>
            <Input id="tabs-demo-username" defaultValue={form.license_number} />
          </div>
        </div>
      </CardContent>

      <CardContent>
        <Tabs defaultValue="treatment">
          <TabsList>
            <TabsTrigger value="treatment">Treatments</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          <TabsContent value="treatment">
            <Card className="p-4">
              <DynamicTable
                data={treatment}
                columns={columns}
                caption="List of Treatments"
                onEdit={(row) => console.log("Delete:", row)}
                onDelete={(row) => console.log("Delete:", row)}
              />
            </Card>
          </TabsContent>
          <TabsContent value="schedule">
            <Card className="p-4">
              <DynamicTable
                data={schedule}
                columns={columns_schedule}
                caption="List of Schedule"
                onEdit={(row) => console.log("Delete:", row)}
                onDelete={(row) => console.log("Delete:", row)}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end w-full mb-4">
          <Button>Save changes</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PatientDetails;
