import React from "react";
import { ChartBarMultiple } from "./components/chart";
import FlashCards from "./components/flash-cards";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CalendarCard from "./components/calendar";

const Dashboard = async () => {
  return (
    <div className="md:px-16">
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
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-3 gap-4">
            <FlashCards />
            <FlashCards />
            <FlashCards />
            <div className="col-span-3">
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
