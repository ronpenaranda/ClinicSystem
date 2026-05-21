import React from "react";
import { fetch_doctors_all } from "@/action/doctor.action";
import { get_user_from_cookies } from "@/lib/auth";
import Wrapper from "./components/wrapper";

const PatientManagement = async () => {
  const doctorData = await fetch_doctors_all();
  const currentUser = await get_user_from_cookies();

  return (
    <div>
      <div className="bg-white px-6 md:px-16">
        <Wrapper data={doctorData} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default PatientManagement;
