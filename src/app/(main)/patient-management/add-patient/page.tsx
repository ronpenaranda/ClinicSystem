import React from "react";
import PatientForm from "../components/patient-details";
import type { PatientDetails } from "@/model/patient.model";

const Page = async () => {
  const initFormValue: PatientDetails[] = [
    {
      first_name: "",
      middle_name: "",
      last_name: "",
      address: "",
      gender: "Male",
      phone_number: "",
      email_address: "",
      created_by: "",
      created_at: "",
      remarks: "",
    },
  ];
  return (
    <div className="mt-12">
      <div className="bg-white px-6 md:px-16">
        <PatientForm data={initFormValue} />
      </div>
    </div>
  );
};

export default Page;
