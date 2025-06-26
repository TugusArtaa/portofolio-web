"use client";

import { useState, useEffect } from "react";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/FormInput";
import ImageUpload from "@/components/shared/ImageUpload";
import SkillPreview from "@/components/shared/SkillPreview";
import { useToast } from "@/components/ui/toast";

interface SkillFormProps {
  existing?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const LEVEL_OPTIONS = [
  {
    label: "Beginner",
    value: "Beginner",
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
  {
    label: "Intermediate",
    value: "Intermediate",
    color:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
  {
    label: "Advanced",
    value: "Advanced",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    label: "Expert",
    value: "Expert",
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
];

export default function SkillForm({
  existing,
  onSuccess,
  onCancel,
}: SkillFormProps) {
  const [form, setForm] = useState({
    name: "",
    level: "",
    icon: "",
  });
  const [iconPreview, setIconPreview] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name || "",
        level: existing.level || "",
        icon: existing.icon || "",
      });
      setIconPreview(existing.icon || "");
    }
  }, [existing]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Nama skill wajib diisi";
    if (form.name.length > 50)
      newErrors.name = "Nama skill maksimal 50 karakter";
    if (!form.level.trim()) newErrors.level = "Level skill wajib diisi";
    if (form.icon && !isValidIcon(form.icon)) {
      newErrors.icon = "Icon harus berupa URL gambar valid atau file upload";
    }
    if (form.icon && form.icon.length > 255) {
      newErrors.icon = "URL icon maksimal 255 karakter";
    }
    return newErrors;
  };

  function isValidIcon(value: string) {
    if (
      value.startsWith("/uploads/") ||
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("data:image/")
    ) {
      return true;
    }
    return false;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldError = validate()[field];
    if (fieldError) setErrors((prev) => ({ ...prev, [field]: fieldError }));
  };

  const handleLevelSelect = (level: string) => {
    setForm((prev) => ({ ...prev, level }));
    setErrors((prev) => ({ ...prev, level: "" }));
    setTouched((prev) => ({ ...prev, level: true }));
  };

  const handleIconChange = (url: string) => {
    setForm((prev) => ({ ...prev, icon: url }));
    setIconPreview(url);
    if (errors.icon) setErrors((prev) => ({ ...prev, icon: "" }));
  };

  const handleSubmit = async () => {
    const validation = validate();
    setErrors(validation);
    setTouched({
      name: true,
      level: true,
      icon: true,
    });
    if (Object.keys(validation).length > 0) {
      addToast({
        type: "error",
        title: "Form Tidak Valid",
        message: "Silakan lengkapi semua field yang wajib diisi.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const method = existing ? "PUT" : "POST";
      const url = existing ? `/api/skills/${existing.id}` : "/api/skills";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        addToast({
          type: "success",
          title: existing ? "Skill Diperbarui" : "Skill Ditambahkan",
          message: existing
            ? "Skill berhasil diperbarui."
            : "Skill baru berhasil ditambahkan.",
        });
        if (onSuccess) onSuccess();
      } else {
        throw new Error();
      }
    } catch {
      addToast({
        type: "error",
        title: "Gagal Menyimpan",
        message: "Terjadi kesalahan saat menyimpan skill.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title={existing ? "Edit Skill" : "Tambah Skill"}
      subtitle={
        existing ? "Edit detail skill Anda" : "Tambah skill baru ke daftar"
      }
      onCancel={() => window.history.back()}
      onSubmit={handleSubmit}
      submitLabel={existing ? "Update Skill" : "Simpan Skill"}
      isSubmitting={isSubmitting}
      preview={
        <SkillPreview name={form.name} level={form.level} icon={iconPreview} />
      }
    >
      <FormInput
        label="Nama Skill"
        name="name"
        placeholder="Contoh: React, Node.js"
        value={form.name}
        onChange={handleChange}
        onBlur={() => handleBlur("name")}
        required
        error={touched.name ? errors.name : ""}
        iconColor="blue-500"
      />

      {/* Level Picker */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">
          Level <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {LEVEL_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`px-4 py-2 rounded-xl font-semibold border transition-all duration-200 focus:outline-none
                ${
                  form.level === opt.value
                    ? `${opt.color} border-blue-500 ring-2 ring-blue-200 dark:ring-blue-700`
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                }
              `}
              onClick={() => handleLevelSelect(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {touched.level && errors.level && (
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
            {errors.level}
          </p>
        )}
      </div>

      {/* Icon Upload */}
      <div className="space-y-2">
        <ImageUpload
          label="Icon Skill (1:1, opsional)"
          value={form.icon}
          onChange={handleIconChange}
          onPreviewChange={setIconPreview}
        />
        {touched.icon && errors.icon && (
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
            {errors.icon}
          </p>
        )}
      </div>
    </FormLayout>
  );
}
