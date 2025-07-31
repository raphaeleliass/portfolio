"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import clsx from "clsx";
import { HTMLAttributes, Ref } from "react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  projectsCount?: number;
  createdAt: string;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export default function LastProject({
  projectsCount = 0,
  className,
  createdAt,
  ref,
}: CardProps) {
  const date = new Date(createdAt);

  const lastProjectAdded = date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "short",
  });

  const chartData = [
    {
      projects: projectsCount,
      fill: "var(--color-primary)",
    },
  ];

  const chartConfig = {
    projects: {
      label: "projects",
    },
  } satisfies ChartConfig;

  return (
    <Card
      className={clsx(
        "flex h-full flex-col items-center justify-center",
        className,
      )}
      ref={ref}
    >
      <CardContent className="w-full">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full"
        >
          <RadialBarChart
            data={chartData}
            startAngle={95}
            endAngle={-190}
            innerRadius={55}
            outerRadius={90}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[60, 50]}
            />
            <RadialBar
              dataKey="projects"
              background
            />

            <PolarRadiusAxis
              tick={false}
              tickLine={false}
              axisLine={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].projects.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground font-black"
                        >
                          Projetos
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex flex-col text-center">
        <p className="w-full text-base font-bold">Último projeto adicionado</p>
        <p className="text-muted-foreground mt-1 text-base font-bold">
          {lastProjectAdded}
        </p>
      </CardFooter>
    </Card>
  );
}
