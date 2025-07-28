import React from 'react'
import { MultiSelectCombobox } from '@/components/multiselect';

const FilterTab = () => {
  return (
    <div>        <div className='mb-5 flex gap-2'>
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
            </div></div>
  )
}

export default FilterTab