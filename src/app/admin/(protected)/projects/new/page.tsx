"use client";

import ProjectForm from "../_form";

export default function NewProjectPage() {
  return (
    <ProjectForm onSuccess={() => (window.location.href = "/admin/projects")} />
  );
}
