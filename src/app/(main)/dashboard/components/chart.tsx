"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Appointment statistics bar chart";

export type AppointmentChartPoint = {
  month: string;
  appointments: number;
};

interface ChartBarMultipleProps {
  chartData: AppointmentChartPoint[];
  chartRangeLabel: string;
  totalAppointments: number;
}

const chartConfig = {
  appointments: {
    label: "Appointments",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarMultiple({
  chartData,
  chartRangeLabel,
  totalAppointments,
}: ChartBarMultipleProps) {
  const latestMonthValue =
    chartData?.length > 0
      ? (chartData[chartData?.length - 1]?.appointments ?? 0)
      : 0;
  const previousMonthValue =
    chartData?.length > 1
      ? (chartData[chartData?.length - 2]?.appointments ?? 0)
      : 0;
  const trendDelta =
    previousMonthValue > 0
      ? (
          ((latestMonthValue - previousMonthValue) / previousMonthValue) *
          100
        ).toFixed(1)
      : null;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-1">
        <CardTitle>Appointment Statistics</CardTitle>
        <CardDescription>
          {chartRangeLabel || "No date range available"}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2">
        <ChartContainer
          config={chartConfig}
          className="min-h-[180px] w-full h-full"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="appointments"
              fill="var(--color-appointments)"
              radius={6}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
