import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

const FlashCards = () => {
  return (
    <Card className="flex items-center gap-4 p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
        <User className="h-6 w-6 text-red-500" />
      </div>
      <CardContent className="p-0">
        <CardTitle className="text-sm text-gray-500">Patients Today</CardTitle>
        <p className="text-2xl font-bold text-gray-900">8</p>
      </CardContent>
    </Card>
  );
};

export default FlashCards;
