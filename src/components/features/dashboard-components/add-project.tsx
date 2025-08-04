import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { HTMLAttributes, Ref } from "react";
import NewProject from "../auth/components/new-project";

interface CardProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  ref?: Ref<HTMLButtonElement>;
}

export default function AddProject({ className, ref, ...props }: CardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role="button"
          className={clsx(
            "fixed right-3 bottom-3 p-3 drop-shadow-2xl z-50",
            className,
          )}
          ref={ref}
          {...props}
        >
          <p className="">Adicionar projeto</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80dvh] overflow-y-scroll md:max-w-2xl">
        <DialogTitle>Adicionar um novo projeto</DialogTitle>
        <DialogDescription className="sr-only">
          Preencha os campos e adicione seu projeto mais recente
        </DialogDescription>

        <NewProject>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancelar</Button>
          </DialogClose>
        </NewProject>
      </DialogContent>
    </Dialog>
  );
}
