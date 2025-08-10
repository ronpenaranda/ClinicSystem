"use client";

import { useLiveAppointments } from "@/hooks/useLiveAppointments";
import DynamicTable from "@/components/table/table";
import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const columns = [
  { header: "Patient Name", keys: "patient_uid" },
  { header: "Doctor's Name", keys: "doctor_id" },
  { header: "Appointment", keys: "appointment_date" },
  { header: "Schedule Time", keys: "start_time" },
  { header: "Remarks", keys: "remarks" },
];

const LiveAppointment = () => {
  const { appointments, loading, error } = useLiveAppointments();

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          size="sm"
          onClick={() => console.log("Add Button")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Appointment
        </Button>
      </div>
      <Card className="p-4">
        <DynamicTable
          data={appointments}
          columns={columns}
          caption="List of Appointments"
          onEdit={(row) => console.log("Delete:", row)}
          onDelete={(row) => console.log("Delete:", row)}
        />
      </Card>
    </div>
  );
};
export default LiveAppointment;
