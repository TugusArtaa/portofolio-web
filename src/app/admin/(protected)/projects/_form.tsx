"use client";

import { useState, useEffect } from "react";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/FormInput";
import ImageUpload from "@/components/shared/ImageUpload";
import ProjectPreview from "@/components/shared/ProjectPreview";

interface ProjectFormProps {
  existing?: any;
  onSuccess?: () => void;
}

export default function ProjectForm({ existing, onSuccess }: ProjectFormProps) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    techStack: "",
    coverImage: "",
    url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (existing) {
      setForm({
        ...existing,
        techStack: existing.techStack.join(","),
      });
      setPreviewImage(existing.coverImage || "");
    }
  }, [existing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Auto generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setForm((prev) => ({ ...prev, [name]: value, slug }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const method = existing ? "PUT" : "POST";
      const url = existing ? `/api/project/${existing.id}` : "/api/project";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          techStack: form.techStack
            .split(",")
            .map((tech) => tech.trim())
            .filter(Boolean),
        }),
      });

      if (response.ok) {
        if (onSuccess) onSuccess();
      } else {
        throw new Error("Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Terjadi kesalahan saat menyimpan proyek");
    } finally {
      setIsSubmitting(false);
    }
  };

  const icons = {
    title: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
    ),
    slug: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    ),
    description: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    ),
    techStack: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    url: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    ),
  };

  return (
    <FormLayout
      title={existing ? "Edit Proyek" : "Tambah Proyek"}
      subtitle={
        existing
          ? "Form untuk mengedit project anda active"
          : "Form untuk menambahkan project baru active"
      }
      onCancel={() => window.history.back()}
      onSubmit={handleSubmit}
      submitLabel={existing ? "Update Proyek" : "Simpan Proyek"}
      isSubmitting={isSubmitting}
      preview={
        <ProjectPreview
          title={form.title}
          description={form.description}
          techStack={form.techStack}
          previewImage={previewImage}
        />
      }
    >
      <FormInput
        label="Judul Proyek"
        name="title"
        placeholder="Masukkan judul proyek yang menarik"
        value={form.title}
        onChange={handleChange}
        icon={icons.title}
        iconColor="blue-500"
        required
      />

      <FormInput
        label="URL Slug"
        name="slug"
        placeholder="url-friendly-slug"
        value={form.slug}
        onChange={handleChange}
        icon={icons.slug}
        iconColor="indigo-500"
      />

      <FormInput
        label="Deskripsi"
        name="description"
        type="textarea"
        placeholder="Jelaskan proyek Anda dengan detail yang menarik"
        value={form.description}
        onChange={handleChange}
        icon={icons.description}
        iconColor="purple-500"
        rows={4}
      />

      <FormInput
        label="Tech Stack"
        name="techStack"
        placeholder="React, Next.js, TypeScript, Tailwind CSS"
        value={form.techStack}
        onChange={handleChange}
        icon={icons.techStack}
        iconColor="emerald-500"
        helpText="Pisahkan dengan koma"
      />

      <ImageUpload
        label="Cover Image"
        value={form.coverImage}
        onChange={(url) => setForm((prev) => ({ ...prev, coverImage: url }))}
        onPreviewChange={setPreviewImage}
      />

      <FormInput
        label="Project URL (Opsional)"
        name="url"
        type="url"
        placeholder="https://your-project.com"
        value={form.url}
        onChange={handleChange}
        icon={icons.url}
        iconColor="orange-500"
      />
    </FormLayout>
  );
}
