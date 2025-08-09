"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Pen } from "lucide-react";

interface TableProps<T> {
  data: T[];
  columns: { header: string; keys: string }[];
  caption?: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

const DynamicTable = <T extends Record<string, any>>({
  data,
  columns,
  caption,
  onEdit,
  onDelete,
}: TableProps<T>) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.keys}>{col.header}</TableHead>
            ))}
            {onEdit && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col) => (
                <TableCell key={col.keys}>{row[col.keys]}</TableCell>
              ))}
              {onEdit && (
                <TableCell className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit && onEdit(row)}
                  >
                    <Pen className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => onDelete && onDelete(row)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DynamicTable;
