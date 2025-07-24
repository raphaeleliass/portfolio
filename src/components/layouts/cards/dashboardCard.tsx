"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import { HTMLAttributes, ReactNode, Ref } from "react";

interface AddNewProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export default function DashboardCard({
  title,
  children,
  className,
  ref,
  ...props
}: AddNewProps) {
  return (
    <Card
      className={clsx(
        "hover:bg-secondary cursor-pointer flex-col items-center justify-center text-2xl transition-colors duration-300 ease-in-out",
        className,
      )}
      ref={ref}
      {...props}
    >
      <CardContent>
        <CardTitle>{title}</CardTitle>
        {children}
      </CardContent>
    </Card>
  );
}
