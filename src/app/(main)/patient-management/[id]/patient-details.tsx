"use client";

import React, { useState } from "react";
import type { PatientDetails } from "@/model/patient.model";
import type { TreatmentDetails } from "@/model/treatment.model";
import type { Payment } from "@/model/payment.model";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DynamicTable from "@/components/table/table";

interface PatientProps {
  data: PatientDetails[];
  treatment: TreatmentDetails[];
  payment: Payment[];
}

const columns = [
  { header: "Doctor", keys: "doctor_id" },
  { header: "Treatment", keys: "treatment" },
  { header: "Notes", keys: "notes" },
  { header: "Amount", keys: "amount" },
];

const columns_payment = [
  { header: "Treatment", keys: "treatment" },
  { header: "Payment Date", keys: "payment_date" },
  { header: "Amount", keys: "amount" },
  { header: "Mode of Payment", keys: "payment_method" },
  { header: "Notes", keys: "note" },
];

const PatientDetails = ({ data, treatment, payment }: PatientProps) => {
  const [form, setForm] = useState<PatientDetails>(data[0]);
  const [treatments, seTtreatment] = useState<TreatmentDetails[]>(treatment);
  const [payments, setPayments] = useState<Payment[]>(payment);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-6">
          <div className="grid col-span-4 gap-2">
            <Label htmlFor="tabs-demo-name">First Name</Label>
            <Input id="tabs-demo-name" defaultValue={form.first_name} />
          </div>
          <div className="grid col-span-4 gap-2">
            <Label htmlFor="tabs-demo-username">Middle Name</Label>
            <Input id="tabs-demo-username" defaultValue={form.middle_name} />
          </div>
          <div className="grid col-span-4 gap-2">
            <Label htmlFor="tabs-demo-username">Last Name</Label>
            <Input id="tabs-demo-username" defaultValue={form.last_name} />
          </div>
          <div className="grid col-span-4 gap-2">
            <Label htmlFor="tabs-demo-username">Gender</Label>
            <Input id="tabs-demo-username" defaultValue={form.last_name} />
          </div>
          <div className="grid col-span-8 gap-2">
            <Label htmlFor="tabs-demo-name">Address</Label>
            <Input id="tabs-demo-name" defaultValue={form.address} />
          </div>
          <div className="grid col-span-6 gap-2">
            <Label htmlFor="tabs-demo-username">Phone Number</Label>
            <Input id="tabs-demo-username" defaultValue={form.phone_number} />
          </div>
          <div className="grid col-span-6 gap-2">
            <Label htmlFor="tabs-demo-username">Email Address</Label>
            <Input id="tabs-demo-username" defaultValue={form.email_address} />
          </div>
        </div>
      </CardContent>

      <CardContent>
        <Tabs defaultValue="treatment">
          <TabsList>
            <TabsTrigger value="treatment">Treatments</TabsTrigger>
            <TabsTrigger value="payment">Payments</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="treatment">
            <Card className="p-4">
              <DynamicTable
                data={treatments}
                columns={columns}
                caption="List of Treatments"
                onEdit={(row) => console.log("Delete:", row)}
                onDelete={(row) => console.log("Delete:", row)}
              />
            </Card>
          </TabsContent>
          <TabsContent value="payment">
            <Card className="p-4">
              <DynamicTable
                data={payments}
                columns={columns_payment}
                caption="List of Payments"
              />
            </Card>
          </TabsContent>
          <TabsContent value="documents">
            <Card className="p-4">
              <p>patient_xray.jpg</p>
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
