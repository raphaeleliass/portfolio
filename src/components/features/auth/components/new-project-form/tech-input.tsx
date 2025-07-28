import { Badge } from "@/components/ui/badge";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { KeyboardEvent, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormTypes } from "../new-project";

interface TechInputProps {
  form: UseFormReturn<FormTypes>;
  disabled: boolean;
}

export function TechInput({ form,disabled }: TechInputProps) {
  const techInputRef = useRef<HTMLInputElement>(null);

  const handleTechKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const techValue = e.currentTarget.value.trim();
      if (techValue) {
        const currentTechs = form.getValues("techs");
        if (!currentTechs.includes(techValue)) {
          form.setValue("techs", [...currentTechs, techValue], {
            shouldValidate: true,
          });
          e.currentTarget.value = "";
        }
      }
    }
  };

  const removeTech = (techToRemove: string) => {
    const currentTechs = form.getValues("techs");
    form.setValue(
      "techs",
      currentTechs.filter((tech) => tech !== techToRemove),
      { shouldValidate: true },
    );
  };

  return (
    <FormItem>
      <FormLabel className="text-muted-foreground">Techs usadas:</FormLabel>
      <FormControl>
        <div
          className={`flex flex-col ${
            form.getValues("techs").length > 0 && "gap-4"
          }`}
        >
          <div
            className="flex flex-row flex-wrap gap-1"
            onClick={() => techInputRef.current?.focus()}
          >
            {form.watch("techs").map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
              >
                {tech}
                <button
                  type="button"
                  className="ring-offset-background focus:ring-ring ml-2 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                  onClick={() => removeTech(tech)}
                >
                  <X className="text-muted-foreground hover:text-foreground h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <Input
            disabled={disabled}
            ref={techInputRef}
            onKeyDown={handleTechKeyDown}
            placeholder="Adicione uma tech e tecle Enter"
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
