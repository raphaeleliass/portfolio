"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectTypes } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import EditProject from "../auth/components/edit-project";

interface ProjectsDataTableProps {
  projects: ProjectTypes[];
}

export function ProjectsDataTable({ projects }: ProjectsDataTableProps) {
  const [search, setSearch] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const router = useRouter();

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.techs.some((tech) =>
        tech.toLowerCase().includes(search.toLowerCase()),
      ) ||
      new Date(project.createdAt)
        .toLocaleDateString()
        .includes(search.toLowerCase()),
  );

  const handleSelectProject = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId],
    );
  };

  const handleSelectAll = () => {
    if (selectedProjects.length === filteredProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredProjects.map((p) => p.id));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const response = await fetch("/api/projects/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedProjects }),
      });

      if (response.ok) {
        toast.success("Projetos deletados com sucesso!");
        setSelectedProjects([]);
        router.refresh();
      } else {
        toast.error("Erro ao deletar projetos.");
      }
    } catch {
      toast.error("Ocorreu um erro.");
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filtrar por título, tecnologia ou data..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      {selectedProjects.length > 0 && (
        <div className="bg-muted flex items-center justify-between rounded-md p-2">
          <span className="text-muted-foreground text-sm">
            {selectedProjects.length} item(s) selecionados
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
            >
              Apagar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedProjects([])}
            >
              Limpar
            </Button>
          </div>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={
                    selectedProjects.length === filteredProjects.length &&
                    filteredProjects.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Tecnologias</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de criação</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProjects.includes(project.id)}
                    onCheckedChange={() => handleSelectProject(project.id)}
                  />
                </TableCell>
                <TableCell>{project.title}</TableCell>
                <TableCell>
                  <div className="bg flex flex-wrap gap-1">
                    {project.techs.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant={"outline"}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={project.published ? "default" : "secondary"}>
                    {project.published ? "Público" : "Privado"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(project.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[80dvh] overflow-y-scroll md:max-w-2xl">
                      <DialogTitle>Editar projeto</DialogTitle>
                      <DialogDescription className="sr-only">
                        Preencha os campos e edite seu projeto
                      </DialogDescription>
                      <EditProject project={project}>
                        <DialogClose asChild>
                          <Button variant={"ghost"}>Cancelar</Button>
                        </DialogClose>
                      </EditProject>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
