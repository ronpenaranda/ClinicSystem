import React from "react";
import { notFound } from "next/navigation";
import { fetch_doctor_by_id } from "@/action/doctor.action";
import DoctorForm from "../add-doctor/doctor-form";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const doctorId = Number(params.id);
  const doctor = await fetch_doctor_by_id(doctorId);

  if (!doctor) return notFound();

  return (
    <div className="mt-12">
      <div className="bg-white px-6 md:px-16">
        <DoctorForm doctor={doctor} mode="edit" />
      </div>
    </div>
  );
};

export default Page;
