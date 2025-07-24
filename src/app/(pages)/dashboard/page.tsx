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

export default function page() {
  return (
    <div className="container mx-auto px-4 py-12">
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
