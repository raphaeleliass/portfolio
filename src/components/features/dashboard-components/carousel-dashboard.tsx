"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProjectTypes } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef } from "react";
import LastProject from "./lastProject";
import { PublishedProjectsChart } from "./published-projects-chart";
import { TechnologiesChart } from "./technologies-chart";

gsap.registerPlugin(ScrollTrigger);

export default function CarouselDashboard({ data }: { data: ProjectTypes[] }) {
  const carouselContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselContentRef.current) return;

    const item = carouselContentRef.current;

    gsap.fromTo(
      item.querySelectorAll("*"),
      { opacity: 0 },
      { opacity: 1, stagger: 0.07 },
    );
  }, []);

  const carouselComponent = useMemo(
    () => [
      {
        component: <PublishedProjectsChart projects={data} />,
      },
      {
        component: <TechnologiesChart projects={data} />,
      },
      {
        component: <LastProject data={data[0].createdAt} />,
      },
    ],
    [data],
  );

  return (
    <Carousel
      className="w-full"
      plugins={[Autoplay({ delay: 3000 })]}
    >
      <CarouselContent ref={carouselContentRef}>
        {carouselComponent.map((item, index) => (
          <CarouselItem
            className="basis-7/8 md:basis-1/3"
            key={index}
          >
            {item.component}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
