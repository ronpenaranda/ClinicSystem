import React from "react";

const Dashboard = async () => {

  return (
    <div>
    <div className="bg-white px-6 md:px-16">
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[500px] flex-1 rounded-xl bg-muted/50" />
    </div>
    </div>
  </div>
  );
};

export default Dashboard;