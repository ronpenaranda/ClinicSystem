"use client";

import React from "react";
import { Loader2, PenLine, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type TableColumn<T extends object> = {
  header: React.ReactNode;
  keys: Extract<keyof T, string>;
  className?: string;
  headerClassName?: string;
  render?: (value: T[Extract<keyof T, string>], row: T) => React.ReactNode;
};

export interface TableProps<T extends object> {
  data: T[];
  columns: TableColumn<T>[];
  caption?: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  isLoading?: boolean;
  id?: number;
  idKey?: Extract<keyof T, string>;
  emptyMessage?: string;
  className?: string;
}

const EMPTY_STATE_COLUMNS = 1;

const formatValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "—";
  }

  if (typeof value === "number") {
    return value.toLocaleString();
  }

  return String(value);
};

const createSkeletonRows = (count: number) =>
  Array.from({ length: count }, (_, rowIndex) => rowIndex);

function DynamicTable<T extends object>({
  data,
  columns,
  caption,
  onEdit,
  onDelete,
  isLoading = false,
  id,
  idKey,
  emptyMessage = "No data available.",
  className,
}: TableProps<T>) {
  const resolvedIdKey = idKey ?? ("id" as Extract<keyof T, string>);
  const hasActions = Boolean(onEdit || onDelete);
  const columnCount = columns.length + (hasActions ? 1 : 0);
  const recordLabel = `${data.length} record${data.length === 1 ? "" : "s"}`;

  return (
    <section
      className={cn(
        "overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col gap-4 border-b border-border/60 bg-gradient-to-r from-muted/40 via-background to-muted/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          {caption ? (
            <p className="text-sm font-semibold tracking-tight text-foreground">
              {caption}
            </p>
          ) : (
            <p className="text-sm font-semibold tracking-tight text-foreground">
              Records
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            {isLoading
              ? "Loading records..."
              : "Browse, edit, and manage the current dataset."}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-full border border-border/70 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm sm:self-auto">
          <span
            className={cn(
              "inline-flex h-2.5 w-2.5 rounded-full",
              isLoading ? "bg-amber-500" : "bg-emerald-500",
            )}
          />
          {isLoading ? "Fetching" : recordLabel}
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-muted/25">
            <TableRow className="hover:bg-transparent">
              {columns.map((column) => (
                <TableHead
                  key={column.keys}
                  className={cn(
                    "h-12 whitespace-nowrap px-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                    column.headerClassName,
                  )}
                >
                  {column.header}
                </TableHead>
              ))}

              {hasActions ? (
                <TableHead className="h-12 px-5 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Actions
                </TableHead>
              ) : null}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              createSkeletonRows(5).map((rowIndex) => (
                <TableRow
                  key={`skeleton-${rowIndex}`}
                  className="animate-pulse"
                >
                  {columns.map((column) => (
                    <TableCell
                      key={`${column.keys}-${rowIndex}`}
                      className="px-5 py-4"
                    >
                      <div className="h-4 w-full max-w-[12rem] rounded-full bg-muted" />
                    </TableCell>
                  ))}

                  {hasActions ? (
                    <TableCell className="px-5 py-4 text-right">
                      <div className="ml-auto inline-flex h-9 w-24 rounded-full bg-muted" />
                    </TableCell>
                  ) : null}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={Math.max(columnCount, EMPTY_STATE_COLUMNS)}
                  className="px-5 py-16 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/70 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">
                        {emptyMessage}
                      </p>
                      <p>No rows match the current view.</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => {
                const rowId = row[resolvedIdKey];
                const isCurrentRowLoading =
                  isLoading && id !== undefined && String(id) === String(rowId);

                return (
                  <TableRow
                    key={String(rowId ?? rowIndex)}
                    className="border-border/60 transition-colors even:bg-muted/20 hover:bg-muted/50"
                  >
                    {columns.map((column) => {
                      const value = row[column.keys];

                      return (
                        <TableCell
                          key={`${column.keys}-${rowIndex}`}
                          className={cn(
                            "px-5 py-4 align-middle text-sm text-foreground",
                            column.className,
                          )}
                        >
                          {column.render
                            ? column.render(value, row)
                            : formatValue(value)}
                        </TableCell>
                      );
                    })}

                    {hasActions ? (
                      <TableCell className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          {onEdit ? (
                            <Button
                              type="button"
                              size="icon"
                              variant="outline"
                              className="h-9 w-9 rounded-full border-border/70 bg-background hover:bg-muted"
                              onClick={() => onEdit(row)}
                            >
                              <PenLine className="h-4 w-4" />
                              <span className="sr-only">Edit row</span>
                            </Button>
                          ) : null}

                          {onDelete ? (
                            <Button
                              type="button"
                              size="icon"
                              variant="destructive"
                              className="h-9 w-9 rounded-full"
                              onClick={() => onDelete(row)}
                            >
                              {isCurrentRowLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                              <span className="sr-only">Delete row</span>
                            </Button>
                          ) : null}
                        </div>
                      </TableCell>
                    ) : null}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export default DynamicTable;
