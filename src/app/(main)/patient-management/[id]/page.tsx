import React from "react";
import { fetch_patient_by_id } from "@/action/patient.action";

interface PageProps {
  params: {
    id: string; 
  };
}

const Patient = async ({ params }: PageProps) => {
  const uids = Number(params.id);

  const patient_details = await fetch_patient_by_id(uids);

  return (
    <div>
      <div className="bg-white px-6 md:px-16">
        <pre>{JSON.stringify(patient_details, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Patient;
