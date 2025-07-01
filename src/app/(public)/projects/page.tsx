import React from "react";
import { Project } from "@prisma/client";

async function getProjects() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/public/project`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export default async function ProjectPage() {
  const projects: Project[] = await getProjects();

  return (
    <section className="max-w-4xl mx-auto py-12 text-center">
      <div className="grid gap-6 mt-8">
        {projects.length === 0 && <p>Tidak ada project.</p>}
        {projects.map((project: Project) => (
          <div key={project.id} className="border rounded p-4 text-left">
            <h2 className="text-2xl font-semibold">{project.title}</h2>
            {project.description && (
              <p className="mt-2 text-gray-700">{project.description}</p>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 block"
              >
                Lihat Project
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
