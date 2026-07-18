import { create } from "zustand";
import { Project } from "@/types";
import { mockProjects } from "@/services/mockData";

interface ProjectsState {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  removeProject: (id: string) => void;
  duplicateProject: (id: string) => void;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: mockProjects,
  addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),
  updateProject: (id, patch) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    })),
  removeProject: (id) => set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
  duplicateProject: (id) => {
    const original = get().projects.find((p) => p.id === id);
    if (!original) return;
    const copy: Project = { ...original, id: `p_${Date.now()}`, title: `${original.title} (copy)`, status: "draft" };
    set((state) => ({ projects: [copy, ...state.projects] }));
  },
}));
