import React from "react";
import { fetch_patient_by_id } from "@/action/patient.action";
import { fetch_treatment_by_uid } from "@/action/treatment.action";
import { fetch_payments_by_patient } from "@/action/payment.action";
import PatientDetails from "./patient-details";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const meta_data = await params;
  const uids = Number(meta_data.id);
  const patient_details = await fetch_patient_by_id(uids);
  const patient_treatment = await fetch_treatment_by_uid(uids);
  const patient_payment = await fetch_payments_by_patient(uids);

  return (
    <div className="mt-12">
      <div className="bg-white px-6 md:px-16">
        <PatientDetails
          data={patient_details}
          treatment={patient_treatment}
          payment={patient_payment}
        />
      </div>
    </div>
  );
};

export default Page;
