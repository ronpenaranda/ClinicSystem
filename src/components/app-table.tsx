import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { EllipsisVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

  interface tableProps {
    data: any;
  }

  const ProductTable: React.FC<tableProps> = ({ data }) => {
  return (
    <div>
    <Table>
        <TableCaption>List of your products</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Product Id</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        {data?.map((item: any, index: number) => {
            return (
                <TableRow key={index}>
                <TableHead>{item.id}</TableHead>
                <TableHead>{item.name}</TableHead>
                <TableHead>{item.description}</TableHead>
                <TableHead>{item.unit}</TableHead>
                <TableHead>{item.quantity}</TableHead>
                <TableHead>{item.price}.00</TableHead>
                <TableHead className="text-right">
                    <Button className='bg-white hover:bg-gray-100'>
                        <EllipsisVertical color="black" />
                    </Button>
                </TableHead>
                </TableRow>
            );
        })}
        </TableBody>
    </Table>
</div>
  )
}

export default ProductTable