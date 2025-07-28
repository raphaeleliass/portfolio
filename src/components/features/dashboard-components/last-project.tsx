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
    dateStyle:"short"
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
        "flex flex-col items-center justify-center py-0 md:flex-row",
        className,
      )}
      ref={ref}
    >
      <CardContent className="w-full max-sm:h-1/2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full max-sm:h-full"
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

      <CardFooter className="flex flex-col text-center md:w-2/3">
        <p className="w-full font-bold text-base">Último projeto adicionado</p>
        <p className="text-muted-foreground mt-1 font-bold text-base">{lastProjectAdded}</p>
      </CardFooter>
    </Card>
  );
}
