"use client";

import { useState, useEffect } from "react";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/FormInput";
import ImageUpload from "@/components/shared/ImageUpload";
import ToolsPreview from "@/components/shared/ToolsPreview";
import { useToast } from "@/components/ui/toast";

interface ToolsFormProps {
  existing?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const LEVEL_OPTIONS = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
  { label: "Expert", value: "Expert" },
];

export default function ToolsForm({
  existing,
  onSuccess,
  onCancel,
}: ToolsFormProps) {
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
    if (!form.name.trim()) newErrors.name = "Nama tool wajib diisi";
    if (form.name.length > 50)
      newErrors.name = "Nama tool maksimal 50 karakter";
    if (!form.level.trim()) newErrors.level = "Level tool wajib diisi";
    if (form.icon && form.icon.length > 255) {
      newErrors.icon = "URL icon maksimal 255 karakter";
    }
    return newErrors;
  };

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
      const url = existing ? `/api/tools/${existing.id}` : "/api/tools";
      const payload = {
        ...form,
        id: existing
          ? existing.id
          : form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
            "-" +
            Math.random().toString(36).slice(2, 8),
      };
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        addToast({
          type: "success",
          title: existing ? "Tool Diperbarui" : "Tool Ditambahkan",
          message: existing
            ? "Tool berhasil diperbarui."
            : "Tool baru berhasil ditambahkan.",
        });
        if (onSuccess) onSuccess();
      } else {
        throw new Error();
      }
    } catch {
      addToast({
        type: "error",
        title: "Gagal Menyimpan",
        message: "Terjadi kesalahan saat menyimpan tool.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title={existing ? "Edit Tool" : "Tambah Tool"}
      subtitle={
        existing ? "Edit detail tool Anda" : "Tambah tool baru ke daftar"
      }
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel={existing ? "Update Tool" : "Simpan Tool"}
      isSubmitting={isSubmitting}
      preview={
        <ToolsPreview name={form.name} level={form.level} icon={iconPreview} />
      }
    >
      <FormInput
        label="Nama Tool"
        name="name"
        placeholder="Contoh: VSCode, Figma"
        value={form.name}
        onChange={handleChange}
        onBlur={() => handleBlur("name")}
        required
        error={touched.name ? errors.name : ""}
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
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-500 ring-2 ring-blue-200 dark:ring-blue-700"
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
          label="Icon Tool (1:1, opsional)"
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
