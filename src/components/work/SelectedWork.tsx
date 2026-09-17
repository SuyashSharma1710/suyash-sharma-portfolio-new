import { featuredProjects } from "@/content/projects";
import { SelectedWorkClient } from "./SelectedWorkClient";

export function SelectedWork() {
  return <SelectedWorkClient projects={featuredProjects} />;
}
