"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { delete_appointment } from "@/action/appointment.action";
import DynamicTable, { type TableColumn } from "@/components/table/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useActionHandler } from "@/hooks/useActionHandler";
import { useLiveAppointments } from "@/hooks/useLiveAppointments";
import type { Appointment } from "@/model/appointment.model";

import Loading from "../loading";

const columns = [
  { header: "Patient Name", keys: "patient_name" },
  { header: "Doctor's Name", keys: "doctor_name" },
  { header: "Appointment", keys: "appointment_date" },
  { header: "Schedule Time", keys: "start_time" },
  { header: "Remarks", keys: "remarks" },
] satisfies TableColumn<Appointment>[];

const LiveAppointment = () => {
  const router = useRouter();
  const [id, setId] = useState<number | undefined>(undefined);
  const { execute, isPending } = useActionHandler(delete_appointment);
  const { appointments, loading } = useLiveAppointments();

  const handleDelete = async (row: Appointment) => {
    const appointmentId = row.id;

    if (appointmentId === undefined) {
      return;
    }

    setId(appointmentId);
    const res = await execute(appointmentId);

    if (res) {
      setId(undefined);
    }
  };

  const addAppointment = () => {
    router.push("/appointment/add-appointment");
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button
          size="sm"
          onClick={() => addAppointment()}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Book Appointment
        </Button>
      </div>
      <Card className="p-4">
        <DynamicTable<Appointment>
          data={appointments}
          columns={columns}
          caption="List of Appointments"
          onEdit={(row) => console.log("edit:", row)}
          onDelete={(row) => handleDelete(row)}
          isLoading={isPending}
          id={id}
        />
      </Card>
    </div>
  );
};

export default LiveAppointment;
