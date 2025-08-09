"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DynamicTable from "@/components/table/table";
import type { Doctor } from "@/model/doctor.model";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

interface WrapperProps {
  data: Doctor[];
}

const Wrapper = ({ data }: WrapperProps) => {
  const router = useRouter();

  const columns = [
    { header: "uid", keys: "id" },
    { header: "Name", keys: "name" },
    { header: "Specialization", keys: "specialization" },
    { header: "Contact Number", keys: "contact_number" },
    { header: "Email Address", keys: "email" },
    { header: "License Number", keys: "license_number" },
    { header: "Date Hired", keys: "hire_date" },
  ];

  const handleEdit = (url: Doctor) => {
    router.push(`/doctor-management/${url.id}`);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          size="sm"
          onClick={() => console.log("Add Button")}
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
