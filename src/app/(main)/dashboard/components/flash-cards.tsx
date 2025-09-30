import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface FlashCardProps {
  icon: LucideIcon;
  title: string;
  value: number | string;
  iconColor?: string;
  bgColor?: string;
}

const FlashCard: React.FC<FlashCardProps> = ({
  icon: Icon,
  title,
  value,
  iconColor = "text-blue-500",
  bgColor = "bg-blue-100",
}) => {
  return (
    <Card className="flex items-center gap-4 p-4">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${bgColor}`}
      >
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <CardContent className="p-0">
        <CardTitle className="text-sm text-gray-500">{title}</CardTitle>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </CardContent>
    </Card>
  );
};

export default FlashCard;
