"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { insert_doctor, update_doctor } from "@/action/doctor.action";
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
import type { Doctor } from "@/model/doctor.model";

type DoctorFormState = {
  name: string;
  specialization: string;
  contact_number: string;
  email: string;
  license_number: string;
  notes: string;
};

type DoctorFormMode = "create" | "edit";

interface DoctorFormProps {
  doctor?: Doctor | null;
  mode?: DoctorFormMode;
}

const createInitialForm = (doctor?: Doctor | null): DoctorFormState => ({
  name: doctor?.name ?? "",
  specialization: doctor?.specialization ?? "",
  contact_number: doctor?.contact_number ?? "",
  email: doctor?.email ?? "",
  license_number: doctor?.license_number ?? "",
  notes: doctor?.notes ?? "",
});

const DoctorForm = ({ doctor, mode = "create" }: DoctorFormProps) => {
  const router = useRouter();
  const isEditMode = mode === "edit";
  const doctorId = doctor?.id ?? null;
  const createDoctorAction = useActionHandler(insert_doctor);
  const updateDoctorAction = useActionHandler(update_doctor);
  const isPending = isEditMode
    ? updateDoctorAction.isPending
    : createDoctorAction.isPending;
  const [form, setForm] = useState<DoctorFormState>(() =>
    createInitialForm(doctor),
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(createInitialForm(doctor));
  }, [doctor]);

  const updateForm = (field: keyof DoctorFormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const canSubmit =
    form.name.trim() !== "" &&
    form.specialization.trim() !== "" &&
    form.license_number.trim() !== "" &&
    !isPending;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!form.name.trim()) {
      setError("Doctor name is required.");
      return;
    }

    if (!form.specialization.trim()) {
      setError("Specialization is required.");
      return;
    }

    if (!form.license_number.trim()) {
      setError("License number is required.");
      return;
    }

    const payload: Omit<Doctor, "id" | "hire_date"> = {
      name: form.name.trim(),
      specialization: form.specialization.trim(),
      contact_number: form.contact_number.trim(),
      email: form.email.trim(),
      license_number: form.license_number.trim(),
      notes: form.notes.trim(),
    };

    const response =
      isEditMode && doctorId !== null
        ? await updateDoctorAction.execute(doctorId, payload)
        : await createDoctorAction.execute(payload);

    if (!response) {
      const message = "Unable to save doctor information.";
      setError(message);
      toast.error(message);
      return;
    }

    if (response.success) {
      toast.success(response.message);
      router.push("/doctor-management");
      return;
    }

    setError(response.message);
    toast.error(response.message);
  };

  const title = isEditMode ? "Edit doctor" : "Add a new doctor";
  const description = isEditMode
    ? "Update the doctor details below and save your changes."
    : "Fill in the doctor details below to register a new profile in the clinic system.";
  const submitLabel = isEditMode ? "Update Doctor" : "Save Doctor";

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-gradient-to-r from-slate-50 via-white to-slate-50 px-6 py-6 sm:px-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Doctor management
          </p>
          <CardTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </CardTitle>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="px-6 py-6 sm:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter doctor name"
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                placeholder="Enter specialization"
                value={form.specialization}
                onChange={(event) =>
                  updateForm("specialization", event.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_number">Contact Number</Label>
              <Input
                id="contact_number"
                placeholder="Enter contact number"
                value={form.contact_number}
                onChange={(event) =>
                  updateForm("contact_number", event.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={(event) => updateForm("email", event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="license_number">License Number</Label>
              <Input
                id="license_number"
                placeholder="Enter license number"
                value={form.license_number}
                onChange={(event) =>
                  updateForm("license_number", event.target.value)
                }
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                placeholder="Add any additional notes"
                value={form.notes}
                onChange={(event) => updateForm("notes", event.target.value)}
                className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
              {error}
            </div>
          ) : null}
        </CardContent>

        <CardFooter className="border-t bg-muted/20 px-6 py-5 sm:px-8">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full sm:w-auto"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                submitLabel
              )}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DoctorForm;
