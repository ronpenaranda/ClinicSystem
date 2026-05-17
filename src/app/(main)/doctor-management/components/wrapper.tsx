"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DynamicTable, { type TableColumn } from "@/components/table/table";
import type { Doctor } from "@/model/doctor.model";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { delete_doctor } from "@/action/doctor.action";
import { useActionHandler } from "@/hooks/useActionHandler";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

interface WrapperProps {
  data: Doctor[];
}

const Wrapper = ({ data }: WrapperProps) => {
  const router = useRouter();
  const { execute, isPending } = useActionHandler(delete_doctor);
  const [deleteTarget, setDeleteTarget] = useState<Doctor | null>(null);

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

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const res = await execute(deleteTarget.id);
    if (res?.success) {
      toast.success(res.message);
      setDeleteTarget(null);
      router.refresh();
    } else {
      toast.error(res?.message ?? "Failed to delete doctor");
    }
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
          onDelete={(row) => setDeleteTarget(row)}
        />
      </Card>

      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Doctor</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteTarget?.name}</span>? This
              will also remove all associated appointments, treatments, and
              payments. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wrapper;
