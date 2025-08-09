import React from "react";
import DynamicTable from "./components/table";
import { fetch_patient_all } from "@/action/patient.action";

const PatientManagement = async () => {
  const patientData = await fetch_patient_all();

  return (
    <div>
    <div className="bg-white px-6 md:px-16">
    <DynamicTable
      data={patientData}
      caption="List of Patients"
    />
    </div>
  </div>
  );
};

export default PatientManagement;