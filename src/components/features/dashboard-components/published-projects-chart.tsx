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
import { Pie, PieChart, ResponsiveContainer } from "recharts";

interface PublishedProjectsChartProps {
  projects: ProjectTypes[];
}

export function PublishedProjectsChart({
  projects,
}: PublishedProjectsChartProps) {
  const publishedCount = projects.filter((p) => p.published).length;
  const unpublishedCount = projects.length - publishedCount;

  const chartData = [
    { name: "Públicos", value: publishedCount, fill: "var(--primary)" },
    {
      name: "Não públicos",
      value: unpublishedCount,
      fill: "var(--secondary)",
    },
  ];

  return (
    <Card className="flex h-full flex-col shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Projetos Publicados</CardTitle>
        <CardDescription>
          Visão geral de projetos publicados e não publicados
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        <ChartContainer
          config={{}}
          className="h-full w-full"
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius="0%"
                outerRadius="100%"
                paddingAngle={0}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
