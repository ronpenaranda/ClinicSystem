import React from "react";
import { fetch_patient_all } from "@/action/patient.action";
import Wrapper from "./components/wrapper";

const PatientManagement = async () => {
  const patientData = await fetch_patient_all();

  return (
    <div>
    <div className="bg-white px-6 md:px-16">
      <Wrapper
        data={patientData}
      />
    </div>
  </div>
  );
};

export default PatientManagement;