import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface ProjectFormInputProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  label: string;
  placeholder: string;
  type?: "text" | "textarea";
  disabled?: boolean;
}

export function ProjectFormInput<T extends FieldValues>({
  field,
  label,
  placeholder,
  type = "text",
  disabled,
}: ProjectFormInputProps<T>) {
  return (
    <FormItem>
      <FormLabel className="text-muted-foreground">{label}</FormLabel>
      <FormControl>
        {type === "textarea" ? (
          <Textarea
            disabled={disabled}
            className="min-h-32"
            placeholder={placeholder}
            {...field}
          />
        ) : (
          <Input
            disabled={disabled}
            placeholder={placeholder}
            type={type}
            {...field}
          />
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
