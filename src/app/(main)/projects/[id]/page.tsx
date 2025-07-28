import React from "react";
import Image from "next/image";
import ProjectsService from "@/services/projects";
import image from '@/assets/kidlat/kidlat.png'

const Page = async () => {
  const project = await ProjectsService.getProjectsByName(`MES`);

  return (
    <div className="min-w-[500px] max-w-full items-center overflow-auto">
      <div className="bg-white">
        <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What is {project[0]?.title} ?
            </h2>
            <p className="mt-4 text-gray-500">
              is a sleek and user-friendly web application that provides
              real-time weather updates for any location. Get accurate
              temperature, humidity, and forecast details, empowering you to
              plan your day with ease.
            </p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {Object.entries(project[0]?.technology).map(([key, value]) => {
                const techList = value as string[];
                return (
                  <div key={key}>
                    {techList.map((item, index) => (
                      <div
                        key={index}
                        className="border-t border-gray-200 pt-4"
                      >
                        <dt className="font-medium text-gray-900">{key}</dt>
                        <dd className="mt-2 text-sm text-gray-500">{item}</dd>
                      </div>
                    ))}
                  </div>
                );
              })}
            </dl>
            <button className="bg-gray-100 p-2 mt-7 w-full rounded-sm">
                      Go to ...
            </button>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <Image
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              src={image}
              className="rounded-lg bg-gray-100 object-none"
            />
            <img
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              src="https://tailwindui.com/plus/img/ecommerce-images/product-feature-03-detail-02.jpg"
              className="rounded-lg bg-gray-100"
            />
            <img
              alt="Side of walnut card tray with card groove and recessed card area."
              src="https://tailwindui.com/plus/img/ecommerce-images/product-feature-03-detail-03.jpg"
              className="rounded-lg bg-gray-100"
            />
            <img
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              src="https://tailwindui.com/plus/img/ecommerce-images/product-feature-03-detail-04.jpg"
              className="rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
