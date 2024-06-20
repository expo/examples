import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type PageContext = {
  id: string;
  title: string;
};

export type ProjectContext = {
  title: string;
  initialPage: string;
  selectedPage: string;
  pages: PageContext[];
};

export const useProject = create(
  persist<{
    project: ProjectContext;
    reset: () => void;
    renameProject: (title: string) => void;
    addPage: (title: string) => void;
    removePage: (id: string) => void;
    selectPage: (id: string) => void;
    renamePage: (id: string, title: string) => void;
    setInitialPage: (id: string) => void;
    duplicatePage: (id: string) => void;
  }>(
    (set) => ({
      project: {
        title: "My New Draft",
        initialPage: "1",
        selectedPage: "2",
        pages: [
          { id: "1", title: "Page 1" },
          { id: "2", title: "Page 2" },
        ],
      },
      // Actions
      reset: () =>
        set((state) => ({
          ...state,
          project: {
            title: "My New Draft",
            initialPage: "1",
            selectedPage: "2",
            pages: [
              { id: "1", title: "Page 1" },
              { id: "2", title: "Page 2" },
            ],
          },
        })),
      addPage: (val) =>
        set(({ project, ...state }) => ({
          ...state,
          project: {
            ...project,
            pages: [
              ...project.pages,
              { id: `${project.pages.length + 1}`, title: val },
            ],
          },
        })),
      removePage: (id) =>
        set(({ project, ...state }) => ({
          ...state,
          project: {
            ...project,
            selectedPage:
              project.selectedPage === id ? "1" : project.selectedPage,
            pages: project.pages.filter((page) => page.id !== id),
          },
        })),
      selectPage: (id) =>
        set(({ project, ...state }) => {
          if (!project.pages.find((page) => page.id === id)) {
            throw new Error(`Page with id ${id} not found`);
          }

          return {
            ...state,
            project: {
              ...project,
              selectedPage: id,
            },
          };
        }),
      renamePage: (id, title) =>
        set(({ project, ...state }) => ({
          ...state,
          project: {
            ...project,
            pages: project.pages.map((page) =>
              page.id === id ? { ...page, title } : page
            ),
          },
        })),
      setInitialPage: (id) =>
        set(({ project, ...state }) => {
          if (!project.pages.find((page) => page.id === id)) {
            throw new Error(`Page with id ${id} not found`);
          }

          return {
            ...state,
            project: {
              ...project,
              initialPage: id,
            },
          };
        }),
      renameProject: (title) =>
        set(({ project, ...state }) => ({
          ...state,
          project: {
            ...project,
            title: title,
          },
        })),
      duplicatePage: (id) =>
        set(({ project, ...state }) => ({
          ...state,
          project: {
            ...project,
            pages: [
              ...project.pages,
              {
                id: `${project.pages.length + 1}`,
                title: `Copy of ${
                  project.pages.find((page) => page.id === id)?.title
                }`,
              },
            ],
          },
        })),
    }),
    {
      name: "useProject",
      version: 1,
      // Persist the store to AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
