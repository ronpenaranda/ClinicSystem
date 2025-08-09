import React from "react";
import { fetch_treatment_by_doctor_id } from "@/action/treatment.action";
import { fetch_doctor_by_id } from "@/action/doctor.action";
import PatientDetails from "./doctor-details";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const uids = Number(params.id);
  const doctor_details = await fetch_doctor_by_id(uids);
  const doctor_treatment = await fetch_treatment_by_doctor_id(uids);

  return (
    <div className="mt-12">
      <div className="bg-white px-6 md:px-16">
        <PatientDetails data={doctor_details} treatment={doctor_treatment} />
      </div>
    </div>
  );
};

export default Page;
