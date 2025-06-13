"use client";
import { toTitle } from "@/lib/utils";

import { mockSessions } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

const counts: Record<string, number> = {};

for (const session of mockSessions) {
  const type = toTitle(session.type);
  counts[type] = (counts[type] || 0) + 1;
}

const chartData = Object.entries(counts)
  .map(([type, count]) => ({ type, count }))
  .sort((a, b) => a.type.localeCompare(b.type));

const chartConfig = {
  count: {
    label: "Sessions",
    color: "var(--chart-1)",
  },
};

export default function SessionTypeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Count by Type</CardTitle>
        <CardDescription>
          Displays how many sessions have been logged for each type.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
          >
            <XAxis type="number" dataKey="count" hide />
            <YAxis
              dataKey="type"
              type="category"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
