"use client";

import { useState, useEffect } from "react";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/FormInput";
import ImageUpload from "@/components/shared/ImageUpload";
import ProjectPreview from "@/components/shared/ProjectPreview";
import { useToast } from "@/components/ui/toast";
import { validateForm, projectValidationRules } from "@/lib/validation";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const { addToast } = useToast();

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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    // Validate single field on blur
    const fieldValue = form[fieldName as keyof typeof form];
    const fieldRules = projectValidationRules[fieldName];

    if (fieldRules) {
      const fieldError = validateField(fieldValue, fieldRules);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: fieldError || "",
      }));
    }
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    const allTouched = Object.keys(form).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Validate entire form
    const validation = validateForm(form, projectValidationRules);
    setErrors(validation.errors);

    if (!validation.isValid) {
      addToast({
        type: "error",
        title: "Form Tidak Valid",
        message: "Silakan perbaiki kesalahan pada form sebelum melanjutkan",
      });
      return;
    }

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
        addToast({
          type: "success",
          title: existing
            ? "Proyek Berhasil Diperbarui!"
            : "Proyek Berhasil Ditambahkan!",
          message: existing
            ? "Perubahan pada proyek telah disimpan"
            : "Proyek baru telah ditambahkan ke portfolio Anda",
          duration: 6000,
        });

        // Small delay to show the toast before redirecting
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 1000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      addToast({
        type: "error",
        title: "Gagal Menyimpan Proyek",
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan tidak terduga. Silakan coba lagi.",
        duration: 8000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to validate field
  const validateField = (value: string, rules: any): string | null => {
    if (rules.required && (!value || value.trim() === "")) {
      return "Field ini wajib diisi";
    }

    if (!value || value.trim() === "") return null;

    if (rules.minLength && value.length < rules.minLength) {
      return `Minimal ${rules.minLength} karakter`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maksimal ${rules.maxLength} karakter`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return "Format tidak valid";
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
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
        onBlur={() => handleBlur("title")}
        icon={icons.title}
        iconColor="blue-500"
        required
        error={touched.title ? errors.title : ""}
        helpText="Judul yang menarik akan membuat proyek Anda lebih eye-catching"
      />

      <FormInput
        label="URL Slug"
        name="slug"
        placeholder="url-friendly-slug"
        value={form.slug}
        onChange={handleChange}
        onBlur={() => handleBlur("slug")}
        icon={icons.slug}
        iconColor="indigo-500"
        required
        error={touched.slug ? errors.slug : ""}
        helpText="Slug otomatis dibuat dari judul. Gunakan huruf kecil dan tanda (-)"
      />

      <FormInput
        label="Deskripsi"
        name="description"
        type="textarea"
        placeholder="Jelaskan proyek Anda dengan detail yang menarik"
        value={form.description}
        onChange={handleChange}
        onBlur={() => handleBlur("description")}
        icon={icons.description}
        iconColor="purple-500"
        rows={4}
        required
        error={touched.description ? errors.description : ""}
        helpText="Ceritakan latar belakang, tujuan, dan fitur utama proyek Anda"
      />

      <FormInput
        label="Tech Stack"
        name="techStack"
        placeholder="React, Next.js, TypeScript, Tailwind CSS"
        value={form.techStack}
        onChange={handleChange}
        onBlur={() => handleBlur("techStack")}
        icon={icons.techStack}
        iconColor="emerald-500"
        required
        error={touched.techStack ? errors.techStack : ""}
        helpText="Pisahkan dengan koma. Contoh: React, Node.js, MongoDB"
      />

      <div className="space-y-2">
        <ImageUpload
          label="Cover Image"
          value={form.coverImage}
          onChange={(url) => {
            setForm((prev) => ({ ...prev, coverImage: url }));
            if (errors.coverImage) {
              setErrors((prev) => ({ ...prev, coverImage: "" }));
            }
          }}
          onPreviewChange={setPreviewImage}
        />
        {touched.coverImage && errors.coverImage && (
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {errors.coverImage}
          </p>
        )}
      </div>

      <FormInput
        label="Project URL (Opsional)"
        name="url"
        type="url"
        placeholder="https://your-project.com"
        value={form.url}
        onChange={handleChange}
        onBlur={() => handleBlur("url")}
        icon={icons.url}
        iconColor="orange-500"
        error={touched.url ? errors.url : ""}
        helpText="Link ke demo langsung atau repository proyek"
      />
    </FormLayout>
  );
}
