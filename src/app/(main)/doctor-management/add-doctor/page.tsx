import React from "react";
import DoctorForm from "./doctor-form";

const Page = async () => {
  return (
    <div className="mt-12">
      <div className="bg-white px-6 md:px-16">
        <DoctorForm />
      </div>
    </div>
  );
};

export default Page;
