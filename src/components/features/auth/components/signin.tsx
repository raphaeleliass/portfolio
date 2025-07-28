"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosed, EyeIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.email("Email inválido!"),
  password: z.string().nonempty("Este campo não pode estar vazio!"),
});

type FormTypes = z.infer<typeof formSchema>;

export default function Signin() {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<FormTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = useFormState({ control: form.control });

  async function submitForm({ email, password }: FormTypes) {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
          form.reset();
        },

        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  }

  return (
    <div className="w-full max-w-xs">
      <h2 className="mb-7 text-2xl font-bold">Entrar</h2>
      <Form {...form}>
        <form
          className="flex flex-col gap-7"
          onSubmit={form.handleSubmit(submitForm)}
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <Input
                    placeholder="E-mail"
                    type="email"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <div className="relative flex items-center justify-end">
                    <Input
                      placeholder="Senha"
                      type={visiblePassword ? "text" : "password"}
                      disabled={isSubmitting}
                      {...field}
                    />

                    <button
                      className="text-muted-foreground absolute right-4"
                      type="button"
                      onClick={() => {
                        setVisiblePassword((prev) => !prev);
                      }}
                    >
                      {visiblePassword ? (
                        <EyeClosed size={20} />
                      ) : (
                        <EyeIcon size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Entrar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
