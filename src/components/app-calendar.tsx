"use client";

import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

type CalendarCardProps = {
  title?: string;
  initialDate?: Date;
  onSelect?: (d: Date) => void;
};

export default function Calendar({
  title = "Calendar",
  initialDate = new Date(),
  onSelect,
}: CalendarCardProps) {
  const [cursor, setCursor] = useState<Date>(new Date(initialDate));
  const [selected, setSelected] = useState<Date | null>(null);

  const monthStart = useMemo(
    () => new Date(cursor.getFullYear(), cursor.getMonth(), 1),
    [cursor]
  );
  const monthEnd = useMemo(
    () => new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0),
    [cursor]
  );

  const daysInMonth = monthEnd.getDate();
  const startDayOfWeek = monthStart.getDay(); // 0 (Sun) - 6 (Sat)

  // build days array (including leading blanks)
  const weeks: (number | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) weeks.push(null);
  for (let d = 1; d <= daysInMonth; d++) weeks.push(d);

  const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const goPrev = () =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  const goNext = () =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));

  const handleSelect = (day: number | null) => {
    if (!day) return;
    const picked = new Date(cursor.getFullYear(), cursor.getMonth(), day);
    setSelected(picked);
    onSelect?.(picked);
  };

  const today = new Date();
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-sm">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={goPrev}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">
            {cursor.toLocaleString(undefined, { month: "long" })}{" "}
            {cursor.getFullYear()}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={goNext}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="grid grid-cols-7 gap-2 text-xs text-center text-muted-foreground">
          {weekdayShort.map((w) => (
            <div key={w} className="font-medium">
              {w}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 mt-2">
          {weeks.map((day, idx) => {
            if (day === null) return <div key={`blank-${idx}`} />;

            const dateObj = new Date(
              cursor.getFullYear(),
              cursor.getMonth(),
              day
            );
            const selectedClass =
              selected && isSameDay(selected, dateObj)
                ? "bg-primary text-primary-foreground"
                : "";
            const todayClass = isSameDay(today, dateObj)
              ? "ring-1 ring-primary/40 rounded"
              : "";

            return (
              <button
                key={day}
                onClick={() => handleSelect(day)}
                className={`h-8 w-8 flex items-center justify-center rounded-md text-sm ${selectedClass} ${todayClass}`}
                aria-pressed={selected ? isSameDay(selected, dateObj) : false}
                aria-label={`Select ${
                  cursor.getMonth() + 1
                }/${day}/${cursor.getFullYear()}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <div className="flex items-center justify-between w-full">
          <div className="text-sm text-muted-foreground">
            {selected ? selected.toDateString() : "No date selected"}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelected(null);
                onSelect?.(new Date());
              }}
            >
              Clear
            </Button>
            <Button size="sm" onClick={() => selected && onSelect?.(selected)}>
              Select
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
