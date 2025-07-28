import React from 'react';
import { get_inventory } from '@/app/action/inventory.action';
import Wrapper from './components/wrapper';

const Inventory = async () => {

  const products = await get_inventory();
  
  return (
    <div className='bg-white'>
      <Wrapper data={products}/>
    </div>
  )
}

export default Inventory