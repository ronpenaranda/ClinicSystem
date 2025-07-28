'use client'
import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import ProductTable from '@/components/app-table';
import { MultiSelectCombobox } from '@/components/multiselect';
import { Inventory } from '@/model/inventory.model';

type Options = {
  value: string;
  label: string;
};

const frameworks: Options[] = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "test", label: "test" },
];

const units: Options[] = [
  { value: "pc", label: "Pc" },
  { value: "kg", label: "Kilogram" },
];


type PropsWrapper = {
  data: Inventory[];
};


const Wrapper = ({ data }: PropsWrapper) => {
    const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
    const [selectedUnits, setSelectedUnits] = useState<string[]>([]);

    const filteredProducts = useMemo(() => {
        return data.filter(data => {
        const matchesFramework = selectedFrameworks.length === 0 || selectedFrameworks.includes(data.name);
        const matchesUnit = selectedUnits.length === 0 || selectedUnits.includes(data.unit);
        return matchesFramework && matchesUnit;
        });
    }, [data, selectedFrameworks, selectedUnits]);

  return (
    <div className='bg-white md:px-16'>
        <div className='mb-5 flex gap-2'>
        <MultiSelectCombobox
          options={frameworks}
          label="Products"
          onChange={(values) => setSelectedFrameworks(values)}
        />
        <MultiSelectCombobox
          options={units}
          label="Unit"
          onChange={(values) => setSelectedUnits(values)}
        />
        </div>
        <div className='mb-5 flex justify-end'>
          <Button>
            Add Products
          </Button>       
        </div>
      <ProductTable data={filteredProducts}/>
    </div>
  )
}

export default Wrapper