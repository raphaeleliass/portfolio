import { Card, CardContent, CardDescription } from "@/components/ui/card";

export default function LastProject({ data }: { data: string }) {
  const date = new Date(data);

  const formatedDate = date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="flex h-full w-full flex-col justify-center shadow-none">
      <CardContent>
        <CardDescription className="text-center text-sm">
          <p className="mb-4 text-lg text-pretty">Último projeto adicionado em</p>
          {formatedDate}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
