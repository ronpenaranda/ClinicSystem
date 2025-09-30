"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

export default function AppointmentCalendarCard() {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex items-center justify-between px-4 py-2">
        <CardTitle className="text-base">October 2025</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <div className="grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center gap-1 mb-4">
          {[5, 6, 7, 8, 9, 10, 11].map((d, i) => (
            <div
              key={d}
              className={`py-2 text-sm rounded-md ${
                i === 0
                  ? "bg-primary text-primary-foreground font-bold"
                  : "hover:bg-muted cursor-pointer"
              }`}
            >
              {d}
            </div>
          ))}
        </div>
        <h3 className="text-md mb-2">Upcoming Appointments</h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Michael Jordan</p>
              <p className="text-xs text-muted-foreground">Consultation</p>
            </div>
            <span className="text-xs text-muted-foreground">11:00</span>
          </div>

          <div className="flex items-center gap-3 rounded-lg border p-3">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Stephen Curry</p>
              <p className="text-xs text-muted-foreground">Consultation</p>
            </div>
            <span className="text-xs text-muted-foreground">12:00</span>
          </div>

          <div className="flex items-center gap-3 rounded-lg border p-3">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Lebron James</p>
              <p className="text-xs text-muted-foreground">Consultation</p>
            </div>
            <span className="text-xs text-muted-foreground">13:00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
