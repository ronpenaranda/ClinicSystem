import React from "react";
import LiveAppointment from "./components/live-appointments";

const Page = async () => {
  return (
    <div>
      <div className="bg-white px-6 md:px-16">
        <LiveAppointment />
      </div>
    </div>
  );
};

export default Page;
