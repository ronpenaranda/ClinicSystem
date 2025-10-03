import React from "react";
import { ChartBarMultiple } from "./components/chart";
import { User, CalendarDays, Activity } from "lucide-react";
import FlashCard from "./components/flash-cards";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CalendarCard from "./components/calendar";

const Dashboard = async () => {
  return (
    <div className="px-6 h-full md:px-16">
      <div className="flex justify-end mb-4 gap-2">
        <Button size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Appointment
        </Button>
        <Button size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Patient
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-3 gap-2">
            <FlashCard
              icon={User}
              title="Patients Today"
              value={8}
              iconColor="text-red-500"
              bgColor="bg-red-100"
            />
            <FlashCard
              icon={CalendarDays}
              title="Appointments"
              value={12}
              iconColor="text-green-500"
              bgColor="bg-green-100"
            />
            <FlashCard
              icon={Activity}
              title="Active Doctors"
              value={5}
              iconColor="text-blue-500"
              bgColor="bg-blue-100"
            />

            <div className="col-span-3 ">
              <ChartBarMultiple />
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <CalendarCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
