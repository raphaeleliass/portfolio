import DashboardCard from "@/components/layouts/cards/dashboardCard";
import NewProject from "@/components/layouts/forms/new-project";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRight } from "lucide-react";

interface Payload {
  id: string;
  title: string;
  description: string;
  techs: [];
  url: null;
  repo_url: string;
  image_url: [];
  createdAt: string;
  updatedAt: string;
  userId: string;
}
[];

export default async function page() {
  let projects = [];
  const res = await fetch("http://localhost:3000/api/projects/list", {
    headers: {
      "x-Internal-Api-Key": process.env.INTERNAL_API_KEY!,
    },
  });
  const data: Payload[] = await res.json();
  projects = data;
  console.log(data);

  return (
    <div className="container mx-auto px-4 py-12">
      {projects.map((proj) => (
        <p key={proj.id}>
          {proj.description}
          {proj.techs.map((item) => item).join(" ")}
        </p>
      ))}
      <Dialog>
        <DialogTrigger>
          <DashboardCard
            className="relative flex aspect-square w-56"
            title={"Novo projeto"}
          >
            <ArrowRight
              className="absolute right-5 bottom-5"
              size={32}
            />
          </DashboardCard>
        </DialogTrigger>

        <DialogContent className="max-h-[80dvh] overflow-y-auto">
          <DialogTitle>Adicione um novo projeto</DialogTitle>
          <DialogDescription className="sr-only">
            Adicione novos projetos ao portfólio
          </DialogDescription>
          <NewProject>
            <DialogClose asChild>
              <Button variant={"link"}>Cancelar</Button>
            </DialogClose>
          </NewProject>
        </DialogContent>
      </Dialog>
    </div>
  );
}
