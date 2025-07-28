import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  interface tableProps {
    data: any;
  }

const PosTable: React.FC<tableProps> = ({ data }) => {
  return (
    <div>
    <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Amount</TableHead>
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
                <TableHead>{item.price}</TableHead>
                </TableRow>
            );
        })}
        </TableBody>
    </Table>
</div>
  )
}

export default PosTable