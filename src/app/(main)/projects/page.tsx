import React from "react";
import CardApp from "@/components/app-card";
import ProjectsService from "@/services/projects";

const Page = async () => {
  const project = await ProjectsService.getAllProjects();

  return (
    <div className="min-w-[500px] max-w-full overflow-auto items-center justify-center bg-white p-6 py-10">
      <div className="py-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Projects
        </h2>
        <p className="mt-4 text-gray-500 text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 py-10">
        {project?.map((item, index) => {
          return (
            <div key={index}>
              <CardApp content={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
