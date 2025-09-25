"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DynamicTable from "@/components/table/table";
import { PatientDetails } from "@/model/patient.model";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

interface WrapperProps {
  data: PatientDetails[];
}

const Wrapper = ({ data }: WrapperProps) => {
  const router = useRouter();

  const columns = [
    { header: "uid", keys: "uid" },
    { header: "First Name", keys: "first_name" },
    { header: "Middle Name", keys: "middle_name" },
    { header: "Last Name", keys: "last_name" },
    { header: "Address", keys: "address" },
    { header: "Phone Number", keys: "phone_number" },
    { header: "Email Address", keys: "email_address" },
    { header: "Remarks", keys: "remarks" },
  ];

  const handleEdit = (url: PatientDetails) => {
    router.push(`/patient-management/${url.uid}`);
  };

  const handleAdd = () => {
    router.push(`/patient-management/add-patient`);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          size="sm"
          onClick={() => handleAdd()}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Patient
        </Button>
      </div>

      <Card className="p-4">
        <DynamicTable
          data={data}
          columns={columns}
          caption="List of Patients"
          onEdit={(row) => handleEdit(row)}
          onDelete={(row) => console.log("Delete:", row)}
        />
      </Card>
    </div>
  );
};

export default Wrapper;
