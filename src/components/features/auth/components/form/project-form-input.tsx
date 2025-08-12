import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control, FieldValues, Path } from "react-hook-form";

interface ProjectFormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  isTextArea?: boolean;
  disabled?: boolean;
}

export function ProjectFormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  isTextArea,
  disabled,
}: ProjectFormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-muted-foreground">{label}</FormLabel>
          <FormControl>
            {isTextArea ? (
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
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
