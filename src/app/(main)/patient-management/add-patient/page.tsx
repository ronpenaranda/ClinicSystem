import React from "react";
import PatientForm from "../components/patient-details";

const Page = async () => {
  return (
    <div className="mt-12">
      <div className="bg-white px-6 md:px-16">
        <PatientForm />
      </div>
    </div>
  );
};

export default Page;
