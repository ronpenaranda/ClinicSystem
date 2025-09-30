"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DynamicTable from "@/components/table/table";
import { PatientDetails } from "@/model/patient.model";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useActionHandler } from "@/hooks/useActionHandler";
import { delete_patient } from "@/action/patient.action";

import { Plus } from "lucide-react";

interface WrapperProps {
  data: PatientDetails[];
}

const Wrapper = ({ data }: WrapperProps) => {
  const router = useRouter();
  const [tableData, setTableData] = useState<PatientDetails[]>(data);
  const [id, setId] = useState<number | undefined>(undefined);
  const { execute, isPending } = useActionHandler(delete_patient);

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

  const handleDelete = async (row: PatientDetails) => {
    setId(row.uid);
    const res = await execute(row.uid);
    if (res) {
      setId(undefined);
      setTableData(tableData.filter((item) => item.uid != row.uid));
    }
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
          data={tableData}
          columns={columns}
          caption="List of Patients"
          onEdit={(row) => handleEdit(row)}
          onDelete={(row) => handleDelete(row)}
          isLoading={isPending}
          id={id}
          idKey="uid"
        />
      </Card>
    </div>
  );
};

export default Wrapper;
