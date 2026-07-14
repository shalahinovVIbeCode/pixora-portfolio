import type { Metadata } from "next";
import { ProjectsPage } from "./ProjectsPage";

export const metadata: Metadata = {
  title: "Проєкти — PIXORA",
  description:
    "Добірка вебплатформ, сайтів, мобільних застосунків та автоматизацій PIXORA.",
};

export default function Page() {
  return <ProjectsPage />;
}
