import React from "react";

import AppointmentCalendar from "./components/appointment-calendar";

const Page = async () => {
  return (
    <div className="bg-white px-6 py-6 md:px-16">
      <AppointmentCalendar />
    </div>
  );
};

export default Page;
