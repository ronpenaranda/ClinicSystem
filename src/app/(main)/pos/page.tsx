import React from "react";
import ProductsService from '@/model/inventory.model'
import PosTable from "./pos_table";

import { Input } from "@/components/ui/input"


const Pos = async () => {
  const products = await ProductsService.getAllProducts();

  return (
    <div>
    <div className="bg-white px-6 md:px-16">
      <div className="grid w-full max-w-sm items-center gap-1.5 pb-5">
        <Input type="email" placeholder="Search Products" />
      </div>
      <div className="flex flex-row gap-2">
        <div className="basis-3/4 border p-6 rounded">
          <PosTable data={products} />
        </div>
        <div className="basis-1/8 border p-6 rounded">
          <PosTable data={products} />
        </div>
      </div>
    </div>
  </div>
  );
};

export default Pos;