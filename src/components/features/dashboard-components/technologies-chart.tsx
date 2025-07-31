"use client";

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
import { ProjectTypes } from "@/types";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

interface TechData {
  name: string;
  total: number;
}

interface TechnologiesChartProps {
  projects: ProjectTypes[];
}

export function TechnologiesChart({ projects }: TechnologiesChartProps) {
  const techCounts = projects.reduce(
    (acc: { [key: string]: number }, project: ProjectTypes) => {
      project.techs.forEach((tech) => {
        acc[tech] = (acc[tech] || 0) + 1;
      });
      return acc;
    },
    {},
  );

  const sortedTechs = Object.keys(techCounts)
    .sort((a, b) => techCounts[b] - techCounts[a])
    .slice(0, 3);

  const chartData: TechData[] = sortedTechs.map((tech) => ({
    name: tech,
    total: techCounts[tech],
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-2xl">Tecnologias</CardTitle>
        <CardDescription>Top 3 mais usadas nos projetos</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{}}
          className=" w-full"
        >
          <BarChart
            className="capitalize"
            accessibilityLayer
            layout="vertical"
            data={chartData}
            margin={{
              left: 10,
              right: 40,
              top: 10,
              bottom: 10,
            }}
          >
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={20}
              width={60}
            />
            <XAxis
              dataKey="total"
              type="number"
              hide
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar
              dataKey="total"
              radius={4}
              fill="var(--primary)"
              barSize={16}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
