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
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

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
    .slice(0, 5);

  const chartData: TechData[] = sortedTechs.map((tech) => ({
    name: tech,
    total: techCounts[tech],
  }));

  return (
    <Card className="h-full shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Tecnologias</CardTitle>
        <CardDescription>Top 5 mais usadas nos projetos</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer
          config={{}}
          className="h-full w-full"
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <RadarChart
              className="capitalize"
              data={chartData}
            >
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Radar
                dataKey="total"
                fill="var(--primary)"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
