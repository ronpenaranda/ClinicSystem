"use client";

import React, { useState } from "react";
import type { PatientDetails } from "@/model/patient.model";
import type { TreatmentDetails } from "@/model/treatment.model";
import type { Payment } from "@/model/payment.model";
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import DynamicTable from "@/components/table/table";
import { useActionHandler } from "@/hooks/useActionHandler";
import { insert_patient } from "@/action/patient.action";

interface PatientProps {
  data?: PatientDetails[];
  treatment?: TreatmentDetails[] | undefined;
  payment?: Payment[] | undefined;
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

const initFormValue: PatientDetails[] = [
  {
    first_name: "",
    middle_name: "",
    last_name: "",
    address: "",
    gender: "Male",
    phone_number: "",
    email_address: "",
    created_by: "",
    created_at: "",
    remarks: "",
  },
];

const PatientForm = ({ data, treatment, payment }: PatientProps) => {
  const { execute, isPending } = useActionHandler(insert_patient);
  const [form, setForm] = useState<PatientDetails>(
    data?.[0] ?? initFormValue[0]
  );
  const [treatments, setTreatment] = useState<TreatmentDetails[] | undefined>(
    treatment
  );
  const [payments, setPayments] = useState<Payment[] | undefined>(payment);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (formData: PatientDetails) => {
    const res = await execute(formData);
    if (!res) return toast("Something went wrong");

    toast(res.message);
    if (res.success) setForm(initFormValue[0]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-6">
          <div className="grid col-span-4 gap-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              value={form.first_name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="grid col-span-4 gap-2">
            <Label htmlFor="middle_name">Middle Name</Label>
            <Input
              id="middle_name"
              value={form.middle_name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="grid col-span-4 gap-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              value={form.last_name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="grid col-span-4 gap-2">
            <Label htmlFor="gender">Gender</Label>
            <Input
              id="gender"
              value={form.gender || ""}
              onChange={handleChange}
            />
          </div>
          <div className="grid col-span-8 gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={form.address || ""}
              onChange={handleChange}
            />
          </div>
          <div className="grid col-span-6 gap-2">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              value={form.phone_number || ""}
              onChange={handleChange}
            />
          </div>
          <div className="grid col-span-6 gap-2">
            <Label htmlFor="email_address">Email Address</Label>
            <Input
              id="email_address"
              value={form.email_address || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>

      <CardContent>
        <Tabs defaultValue="treatment">
          <TabsList>
            <TabsTrigger value="treatment">Treatments</TabsTrigger>
            <TabsTrigger value="payment">Payments</TabsTrigger>
            <TabsTrigger value="documents">Medical Records</TabsTrigger>
          </TabsList>
          <TabsContent value="treatment">
            <Card className="p-4">
              <DynamicTable
                data={treatments ?? []}
                columns={columns}
                caption="List of Treatments"
                onEdit={(row) => console.log("Edit:", row)}
                onDelete={(row) => console.log("Delete:", row)}
              />
            </Card>
          </TabsContent>
          <TabsContent value="payment">
            <Card className="p-4">
              <DynamicTable
                data={payments ?? []}
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
          <Button onClick={() => handleSubmit(form)}>
            {isPending ? (
              <div className="flex gap-2 items-center">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving ...
              </div>
            ) : (
              <div>Save changes</div>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PatientForm;
