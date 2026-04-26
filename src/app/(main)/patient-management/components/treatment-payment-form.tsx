"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { insert_treatment_with_payment } from "@/action/treatment.action";
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
import type { Payment } from "@/model/payment.model";
import type { TreatmentDetails } from "@/model/treatment.model";

interface TreatmentPaymentFormProps {
  patientUid: number;
  onTreatmentCreated?: (treatment: TreatmentDetails) => void;
  onPaymentCreated?: (payment: Payment) => void;
}

type TreatmentFormState = {
  doctor_id: string;
  treatment: string;
  notes: string;
  amount: string;
  mode_of_payment: string;
};

const PAYMENT_METHODS = [
  "Cash",
  "Card",
  "Credit",
  "Debit",
  "GCash",
  "Bank Transfer",
];

const defaultFormState: TreatmentFormState = {
  doctor_id: "",
  treatment: "",
  notes: "",
  amount: "",
  mode_of_payment: PAYMENT_METHODS[0],
};

const TreatmentPaymentForm = ({
  patientUid,
  onTreatmentCreated,
  onPaymentCreated,
}: TreatmentPaymentFormProps) => {
  const { execute, isPending } = useActionHandler(
    insert_treatment_with_payment,
  );
  const [form, setForm] = useState<TreatmentFormState>(defaultFormState);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof TreatmentFormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const canSubmit =
    form.doctor_id.trim() !== "" &&
    form.treatment.trim() !== "" &&
    form.amount.trim() !== "" &&
    form.mode_of_payment.trim() !== "" &&
    !isPending;

  const handleSubmit = async () => {
    setError(null);

    const doctorId = Number(form.doctor_id);
    const amount = Number(form.amount);

    if (!Number.isFinite(doctorId) || doctorId <= 0) {
      setError("Doctor ID must be a valid number.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    const response = await execute({
      uid: patientUid,
      doctor_id: doctorId,
      treatment: form.treatment.trim(),
      notes: form.notes.trim(),
      amount,
      mode_of_payment: form.mode_of_payment,
    });

    if (!response) {
      setError("Unable to save the treatment.");
      return;
    }

    if (!response.success) {
      setError(response.message);
      toast.error(response.message);
      return;
    }

    onTreatmentCreated?.(response.treatment);
    onPaymentCreated?.(response.payment);
    toast.success(response.message);
    setForm(defaultFormState);
  };

  return (
    <Card className="overflow-hidden border-border/60 shadow-sm">
      <CardHeader className="border-b bg-gradient-to-r from-slate-50 via-white to-slate-50 px-6 py-6 sm:px-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Patient treatment management
          </p>
          <CardTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Add treatment and auto-create payment
          </CardTitle>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Create a treatment record for this patient. The app will generate a
            matching payment record automatically using the treatment amount and
            selected payment method.
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-6 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border bg-muted/20 p-5">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Patient UID
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  This treatment will be linked to the selected patient.
                </p>
              </div>

              <div className="rounded-xl border bg-background px-4 py-3">
                <span className="text-sm font-medium text-foreground">
                  {patientUid}
                </span>
              </div>

              <div className="rounded-xl border border-dashed bg-background/80 px-4 py-3 text-sm text-muted-foreground">
                The payment entry uses the same treatment name, amount, and
                payment method automatically.
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="doctor_id">Doctor ID</Label>
              <Input
                id="doctor_id"
                type="number"
                inputMode="numeric"
                placeholder="Enter doctor ID"
                value={form.doctor_id}
                onChange={(event) =>
                  updateField("doctor_id", event.target.value)
                }
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                inputMode="decimal"
                placeholder="Enter treatment amount"
                value={form.amount}
                onChange={(event) => updateField("amount", event.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="treatment">Treatment</Label>
              <Input
                id="treatment"
                placeholder="Describe the treatment"
                value={form.treatment}
                onChange={(event) =>
                  updateField("treatment", event.target.value)
                }
                className="bg-background"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                placeholder="Add treatment notes or instructions"
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="mode_of_payment">Payment Method</Label>
              <select
                id="mode_of_payment"
                value={form.mode_of_payment}
                onChange={(event) =>
                  updateField("mode_of_payment", event.target.value)
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {PAYMENT_METHODS.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-muted/20 px-6 py-5 sm:px-8">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Review the treatment details before saving. Payment creation happens
            automatically after the treatment is saved.
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {error ? (
              <div className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive sm:max-w-sm">
                {error}
              </div>
            ) : null}

            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full sm:w-auto"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Treatment"
              )}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TreatmentPaymentForm;
