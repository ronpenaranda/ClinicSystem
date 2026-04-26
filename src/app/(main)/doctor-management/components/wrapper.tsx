"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DynamicTable, { type TableColumn } from "@/components/table/table";
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
  ] satisfies TableColumn<Doctor>[];

  const handleEdit = (url: Doctor) => {
    router.push(`/doctor-management/${url.id}`);
  };

  const handleAdd = () => {
    router.push("/doctor-management/add-doctor");
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          size="sm"
          onClick={handleAdd}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Doctor
        </Button>
      </div>
      <Card className="p-4">
        <DynamicTable
          data={data}
          columns={columns}
          caption="List of Doctors"
          onEdit={(row) => handleEdit(row)}
          onDelete={(row) => console.log("Delete:", row)}
        />
      </Card>
    </div>
  );
};

export default Wrapper;
