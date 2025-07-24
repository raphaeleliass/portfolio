import Index from "@/components/layouts/dashboard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { TabsContent } from "@radix-ui/react-tabs";
import { Edit, Home, PlusCircle, User2 } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard - Portfólio",
  robots: {
    follow: false,
    index: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const tabItems = [
  {
    title: "Inicio",
    icon: Home,
    component: <Index />,
  },
  {
    title: "Novo projeto",
    icon: PlusCircle,
    component: "house",
  },
  {
    title: "Editar Projeto",
    icon: Edit,
    component: "123",
  },
  {
    title: "Perfil",
    icon: User2,
    component: "456",
  },
];

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");

  return (
    <main className="relative container mx-auto flex h-dvh w-full items-end justify-center py-12">
      <Tabs defaultValue={tabItems?.[0].title}>
        <TabsList className="z-50 max-sm:w-56">
          {tabItems.map((item) => {
            const Icon = item.icon;

            return (
              <TabsTrigger
                value={item.title}
                key={item.title}
              >
                <div className="z-40 flex flex-row items-center gap-1">
                  <Icon />
                  <p className="text-xs max-sm:sr-only">{item.title}</p>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabItems.map((component) => (
          <TabsContent
            value={component.title}
            key={component.title}
          >
            <div className="absolute inset-0 top-0 left-0 z-40 p-5">
              {component.component}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
