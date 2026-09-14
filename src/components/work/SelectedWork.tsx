/**
 * SelectedWork — Section 03
 * Editorial sequence of featured projects followed by interactive archive directory.
 */
import { featuredProjects } from "@/content/projects";
import { SelectedWorkClient } from "./SelectedWorkClient";
import { ArchiveIndex } from "./ArchiveIndex";

export function SelectedWork() {
  return (
    <>
      <SelectedWorkClient projects={featuredProjects} />
      <ArchiveIndex showTitle={true} />
    </>
  );
}
