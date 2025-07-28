import React from "react";
import { MultiSelectCombobox } from '@/components/multiselect';

type Options = {
    value: string;
    label: string;
  };

const Reports = async () => {
    const frameworks: Options[] = [
        {
          value: "next.js",
          label: "Next.js",
        },
        {
          value: "sveltekit",
          label: "SvelteKit",
        },
        {
          value: "nuxt.js",
          label: "Nuxt.js",
        },
        {
          value: "remix",
          label: "Remix",
        },
        {
          value: "astro",
          label: "Astro",
        },
      ];
    
      const Units: Options[] = [
        {
          value: "pc",
          label: "Pc",
        },
        {
          value: "kg",
          label: "Kilogram",
        }
      ];

  return (
    <div>
    <div className="bg-white px-6 md:px-16">
            <div className='mb-5 flex gap-2'>
              <MultiSelectCombobox options={frameworks} label={"Products"}/>
              <MultiSelectCombobox options={Units} label={"Unit"}/>
            </div>
    </div>
  </div>
  );
};

export default Reports;