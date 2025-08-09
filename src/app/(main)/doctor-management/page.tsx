import React from "react";
import { fetch_doctors_all } from "@/action/doctor.action";
import Wrapper from "./components/wrapper";

const PatientManagement = async () => {
  const doctorData = await fetch_doctors_all();

  return (
    <div>
      <div className="bg-white px-6 md:px-16">
        <Wrapper data={doctorData} />
      </div>
    </div>
  );
};

export default PatientManagement;
