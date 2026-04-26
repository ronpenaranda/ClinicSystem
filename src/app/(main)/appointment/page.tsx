import React from "react";

import AppointmentCalendar from "./components/appointment-calendar";

const Page = async () => {
  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-8 lg:px-12">
      <AppointmentCalendar />
    </div>
  );
};

export default Page;
