import React from "react";
import { notFound } from "next/navigation";

import AppointmentDayManager from "../components/appointment-day-manager";

interface PageProps {
  params: Promise<{
    date: string;
  }>;
}

function isIsoDateValue(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

const Page = async ({ params }: PageProps) => {
  const { date } = await params;

  if (!isIsoDateValue(date)) {
    notFound();
  }

  const normalizedDate = `${date}T00:00:00`;
  const parsedDate = new Date(normalizedDate);

  if (Number.isNaN(parsedDate.getTime())) {
    notFound();
  }

  return (
    <div className="mt-12">
      <div className="bg-white px-4 py-6 md:px-8 lg:px-12">
        <AppointmentDayManager selectedDate={date} />
      </div>
    </div>
  );
};

export default Page;
