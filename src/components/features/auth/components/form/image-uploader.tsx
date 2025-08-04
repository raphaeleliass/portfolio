import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UseFormReturn } from "react-hook-form";
import { FormTypes } from "../new-project";

interface ImageUploaderProps {
  form: UseFormReturn<FormTypes>;
}

export function ImageUploader({ form }: ImageUploaderProps) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentFiles = form.getValues("images");
      const newFiles = [...currentFiles, ...acceptedFiles];
      form.setValue("images", newFiles, { shouldValidate: true });

      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    },
    [form],
  );

  const removeImage = (indexToRemove: number) => {
    URL.revokeObjectURL(imagePreviews[indexToRemove]);

    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove),
    );

    const currentFiles = form.getValues("images");
    const newFiles = currentFiles.filter((_, index) => index !== indexToRemove);
    form.setValue("images", newFiles, { shouldValidate: true });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    multiple: true,
  });

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  return (
    <FormItem>
      <FormLabel className="text-muted-foreground">Capa do projeto:</FormLabel>
      <FormControl>
        <div
          {...getRootProps()}
          className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:border-none ${
            isDragActive
              ? "border-primary bg-primary-foreground"
              : "border-input bg-background hover:bg-accent"
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-muted-foreground flex flex-col items-center justify-center text-center">
            <UploadCloud className="size-8" />
            {isDragActive ? (
              <p>Solte as imagens aqui...</p>
            ) : (
              <p>Arraste e solte as imagens aqui, ou clique para selecionar</p>
            )}
            <span className="mt-2 text-xs">PNG, JPG, WEBP de até 5MB</span>
          </div>
        </div>
      </FormControl>
      <FormMessage />
      {imagePreviews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {imagePreviews.map((src, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={src}
                alt={`Preview da imagem ${index + 1}`}
                fill
                className="rounded-md object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 rounded-full"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </FormItem>
  );
}
